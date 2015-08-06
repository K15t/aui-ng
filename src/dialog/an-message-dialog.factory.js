;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg').
        factory('anMessageDialog',
            function(anSimpleDialog, $q, anDialogUtils) {

                // jscs:disable
                var defaultTemplate = [
                    '<div class="an-dialog-wrapper">',
                    '   <div class="an-dialog-wrapper-inner">',
                    '       <div class="an-dialog {{ classes.dialog }}" ng-style="styles.dialog">',
                    '           <div class="an-dialog-components">',
                    '               <section class="an-dialog-content {{ classes.content }}" ng-style="styles.content">',
                    '                   <div an-message="message"></div>',
                    '               </section>',
                    '               <footer class="an-dialog-footer">',
                    '                   <div class="an-dialog-footer-actions">',
                    '                       <a class="button-panel-link {{ classes.cancel }}" ng-style="styles.cancel" ng-click="$close()">{{ labels.cancel }}</a>',
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
                                cancel: 'close' // TODO: this needs some internationalization
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
