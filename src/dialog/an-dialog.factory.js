;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .provider('anDialog',
            function() {
                var extendedOptions = {};

                this.extendOptions = function(options) {
                    extendedOptions = options;
                };

                this.$get = ['$animate', '$compile', '$rootScope', '$controller', '$q', '$http', '$templateCache', 'anDialogUtils',
                    function($animate, $compile, $rootScope, $controller, $q, $http, $templateCache, anDialogUtils) {
                    var stack = [];
                    var startZindex = 3000;
                    var focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
                    var $body = angular.element('body');
                    var orgOverflow = $body.css('overflow');
    
                    var defaultTemplate = [
                        '<div class="an-dialog-wrapper" ng-class="{\'an-dialog-loading\': $isLoading, \'an-dialog-loaded\': !$isLoading }" tabindex="-1">',
                        '   <div class="an-dialog-wrapper-inner">',
                        '       <div class="an-dialog {{ classes.dialog }}" ng-style="styles.dialog">',
                        '           <div class="an-dialog-components">',
                        '               <div ng-bind-html="content"></div>',
                        '           </div>',
                        '       </div>',
                        '   </div>',
                        '</div>'
                    ].join('\n');
    
                    var onKeyDown = function(ev) {
                        if (stack.length && stack[stack.length - 1].options.closeOnEscape && ev.keyCode === 27) {
                            stack[stack.length - 1].scope.$close();
                        }
                    };
    
                    var onBlanketClick = function(ev) {
                        if (stack.length && stack[stack.length - 1].options.closeOnBlanketClick &&
                            angular.element(ev.target).hasClass('an-dialog-wrapper-inner')) {
                            stack[stack.length - 1].scope.$close();
                        }
                    };
    
                    var onFocusIn = function (ev) {
                        var modalElement = $body.find('.an-dialog-wrapper')[0];
                        var target = ev.target;
    
                        if (!stack.length) {
                            return;
                        }
    
                        // In case the target element belongs to select2, dont't do anything.
                        // Select2 injects the options list into the html body, so it is outside of the modal,
                        // even if the select2 itself is used inside the modal.
                        if (angular.element.fn && angular.element.fn.closest &&
                            angular.element(target).closest('.select2-drop').length) {
                            return;
                        }
    
                        if (!modalElement.contains(target)) {
                            angular.element(modalElement).find(focusableElements).filter(':visible')[0].focus();
                        }
                    };

                    var addDialogToStack = function(dialog) {
                        if (!stack.length) {
                            $body.css('overflow', 'hidden');
                            $body.on('click', onBlanketClick);
                            $body.on('focusin', onFocusIn);
                            document.addEventListener('keydown', onKeyDown);
                        }
                        stack.push(dialog);
                    };
    
                    var popDialogFromStack = function() {
                        if (!stack.length) {
                            return;
                        }
    
                        stack.pop();

                        if (!stack.length) {
                            $body.off('click', onBlanketClick);
                            $body.off('focusin', onFocusIn);
                            $body.css('overflow', orgOverflow);
                            document.removeEventListener('keydown', onKeyDown);
                        }
                    };
    
                    var getTemplate = function(template) {
                        if (typeof template === 'function') {
                            return $q.resolve(template());
                        }
                        return $http.get(template, {
                            cache: $templateCache
                        }).then(function(response) {
                            return response.data;
                        });
                    };
    
                    // this code is highly inspired by https://github.com/btford/angular-modal
                    var create = function(opts) {
                        var defaults = {
                            width: 640,
                            height: 480,
                            template: function() {
                                return $q.when(defaultTemplate);
                            },
                            contentTemplate: null,
                            controller: null,
                            controllerAs: 'dialogCtrl',
                            closeOnEscape: true,
                            closeOnBlanketClick: false,
                            onOpen: angular.noop,
                            onClose: angular.noop,
                            promises: [],
                            locals: {}
                        };
    
                        var options = anDialogUtils.extendOptions(defaults, extendedOptions || {}, opts);
                        var scope;
                        var element;
                        var $blanket = $('<div class="an-dialog-blanket"></div>');
    
                        var open = function() {
                            return getTemplate(options.template).then(function(wrapperContent) {
                                if (!options.contentTemplate) {
                                    return wrapperContent;
                                }
                                return getTemplate(options.contentTemplate).then(function(content) {
                                    var wrapperEl = angular.element(wrapperContent);
                                    wrapperEl.find('[ng-bind-html="content"]').removeAttr('ng-bind-html').html(content);
                                    return wrapperEl.get(0).outerHTML;
                                });
                            }).then(attach);
                        };
    
                        var attach = function(html) {
                            element = angular.element(html);
                            if (element.length === 0) {
                                throw new Error('The template contains no elements; you need to wrap text nodes');
                            }
                            scope = options.scope ? options.scope.$new() : $rootScope.$new();
                            dialog.scope = scope;
    
                            angular.extend(scope, options.locals, {
                                $close: close,
                                $submit: close,
                                $disableSubmit: angular.noop,
                                $isLoading: true,
                                dialog: dialog
                            });
    
                            if (options.controller) {
                                var deps = {
                                    dialog: dialog,
                                    $scope: scope
                                };
                                var ctrl = $controller(options.controller, deps);
                                if (options.controllerAs) {
                                    scope[options.controllerAs] = ctrl;
                                }
                            }
    
                            return $q.all(options.promises).then(function() {
                                addDialogToStack(dialog);
    
                                $compile(element)(scope);

                                $blanket.css('z-index', startZindex + ((stack.length * 2) - 1));
                                $blanket.appendTo($body);
    
                                element.css('z-index', startZindex + stack.length * 2);
                                return $animate.enter(element, $body).then(function() {
                                    scope.$isLoading = false;
                                    element.focus();
                                });
                            });
                        };
    
                        var close = function() {
                            var args = arguments;
                            if (!element) {
                                return $q.when();
                            }
                            return $animate.leave(element).then(function() {
                                scope.$emit('$close', args);
                                scope.$destroy();
                                scope = null;
                                element.remove();
                                element = null;
                                $blanket.remove();
                                $blanket = null;
                                popDialogFromStack();
                                options.onClose.apply(null, args);
                            });
                        };
    
                        var waitFor = function(promise) {
                            options.promises.push(promise);
                        };
    
                        var dialog = {
                            close: close,
                            options: options,
                            waitFor: waitFor,
                            openPromise: null
                        };
    
                        dialog.openPromise = open().then(function() {
                            options.onOpen(dialog);
                            return dialog;
                        });
    
                        return dialog;
                    };
    
                    return {
                        create: create
                    };
                }];
            }
    );
})(angular);
