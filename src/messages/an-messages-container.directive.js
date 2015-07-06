;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anMessagesContainer', function(anMessages) {

            var defaultTemplate = [
                '<div class="aui-messages an-messages-container">',
                '   <div ng-repeat="message in messagesCtrl.messages" class="aui-message aui-message-{{ message.severity }}">',
                '       <p ng-if="message.title" class="title">',
                '           <span class="aui-icon icon-{{ message.severity }}"></span>',
                '           <strong ng-bind="message.title"></strong>',
                '       </p>',
                '       <p ng-if="message.message" ng-bind-html="message.message"></p>',
                '   </div>',
                '</div>'
            ].join('\n');

            return {
                restrict: 'A',
                scope: {},
                require: 'anMessagesContainer',
                controllerAs: 'messagesCtrl',
                template: defaultTemplate,
                controller: function() {
                    var that = this;

                    var uniqueId = (function() {
                        var id = 0;
                        return function() {
                            return id++;
                        };
                    })();

                    this.messages = [];

                    var defaults = {
                        severity: 'info',
                        title: null,
                        message: null
                    };

                    this.addMessage = function(opts) {
                        var id = uniqueId();
                        that.messages.push(angular.extend({$id: id}, defaults, opts));

                        return function() {
                            for (var i = 0, len = that.messages.length; i < len; i++) {
                                if (that.messages[i].$id === id) {
                                    that.messages = that.messages.splice(i, 1);
                                    break;
                                }
                            }
                        };
                    };

                    this.clearMessages = function() {
                        that.messages.length = 0;
                    };
                },
                link: function(scope, elm, attrs, ctrl) {
                    var id = attrs.anMessagesContainer;

                    if (!id) {
                        throw new Error('container id missing');
                    }

                    var unregister = anMessages.register(id, ctrl);

                    scope.$on('$destroy', unregister);
                }
            };
        }
    );

})(angular);
