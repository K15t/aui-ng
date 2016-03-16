;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg').
        factory('anMessageDialog',
            function(anSimpleDialog, $q, anDialogUtils) {

                // jscs:disable
                var defaultTemplate = [
                    '<div class="an-dialog-wrapper" ng-class="{\'an-dialog-loading\': $isLoading, \'an-dialog-loaded\': !$isLoading }">',
                    '   <div class="an-dialog-wrapper-inner">',
                    '       <div class="an-dialog {{ classes.dialog }}" ng-style="styles.dialog">',
                    '           <div class="an-dialog-components">',
                    '               <header class="an-dialog-header {{ classes.header }}" ng-style="styles.header">',
                    '                   <h2 class="an-dialog-header-title {{ classes.title }}" ng-style="styles.title">{{ labels.title }}</h2>',
                    '                   <a class="an-dialog-header-close {{ classes.closes }}" ng-style="styles.close" ng-click="$close()"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">{{ labels.cancel }}</span></a>',
                    '               </header>',
                    '               <section class="an-dialog-content {{ classes.content }}" ng-style="styles.content">',
                    '                   <div an-message="message"></div>',
                    '               </section>',
                    '               <footer class="an-dialog-footer">',
                    '                   <div class="an-dialog-footer-actions">',
                    '                       <button class="aui-button aui-button-link {{ classes.cancel }}" ng-style="styles.cancel" ng-click="$close()">{{ labels.cancel }}</button>',
                    '                   </div>',
                    '               </footer>',
                    '           </div>',
                    '       </div>',
                    '   </div>',
                    '</div>'
                ].join('\n');
                // jscs:enable


                var defaults = {
                    template: function() {
                        return $q.when(defaultTemplate);
                    },
                    controller: ['$scope', 'dialog', function($scope, dialog) {
                        $scope.$submit = function() {
                            dialog.close(true);
                        };
                    }],
                    locals: {
                        styles: {
                            content: {
                                padding: '20px'
                            }
                        }
                    }
                };

                var create = function(message, opts) {
                    return anSimpleDialog.create(anDialogUtils.extendOptions(defaults, {
                        locals: {
                            labels: {
                                cancel: 'Close'
                            },
                            message: message
                        }
                    }, opts));
                };

                return {
                    create: create
                };
            }
    );
})(angular);
