;(function(angular) {
    'use strict';

    angular.module('k15t.auiNg')
        .provider('anSimpleDialog', function() {
            var extendedOptions = {};

            this.extendOptions = function(options) {
                extendedOptions = options;
            };

            this.$get = ['anDialog', '$q', 'anDialogUtils', function(anDialog, $q, anDialogUtils) {
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
                    '               <section class="an-dialog-content {{ classes.content }}" ng-style="styles.content" ng-bind-html="content"></section>',
                    '               <footer class="an-dialog-footer">',
                    '                   <div class="an-dialog-footer-actions">',
                    '                       <button class="aui-button aui-button-primary {{ classes.submit }}" ng-style="styles.submit" ng-disabled="$disableSubmit()" ng-click="$submit()">{{ labels.submit }}</button>',
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
                    locals: {
                        labels: {
                            submit: 'Submit',
                            cancel: 'Cancel'
                        },
                        classes: {},
                        styles: {}
                    }
                };

                var create = function(opts) {
                    return anDialog.create(anDialogUtils.extendOptions(defaults, extendedOptions || {}, opts));
                };

                return {
                    create: create
                };
            }];
        });
})(angular);
