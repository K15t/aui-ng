;(function(angular) {
    'use strict';

    angular.module('k15t.auiNg').
        factory('anSimpleDialog',
            function(anDialog, $q, anDialogUtils) {

                // jscs:disable
                var defaultTemplate = [
                    '<div class="an-dialog-wrapper">',
                    '   <div class="an-dialog-wrapper-inner">',
                    '       <div class="an-dialog {{ classes.dialog }}" ng-style="styles.dialog">',
                    '           <div class="an-dialog-components">',
                    '               <header class="an-dialog-header {{ classes.header }}" ng-style="styles.header">',
                    '                   <h2 class="an-dialog-header-title {{ classes.title }}" ng-style="styles.title">{{ labels.title }}</h2>',
                    '                   <a class="an-dialog-header-close {{ classes.closes }}" ng-style="styles.close" ng-click="$close()"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">Close</span></a>',
                    '               </header>',
                    '               <section class="an-dialog-content {{ classes.content }}" ng-style="styles.content" ng-bind-html="content"></section>',
                    '               <footer class="an-dialog-footer">',
                    '                   <div class="an-dialog-footer-actions">',
                    '                       <button class="aui-button {{ classes.submit }}" ng-style="styles.submit" ng-disabled="$disableSubmit()" ng-click="$submit()">{{ labels.submit }}</button>',
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
                    return anDialog.create(anDialogUtils.extendOptions(defaults, opts));
                };

                return {
                    create: create
                };
            }
    );
})(angular);
