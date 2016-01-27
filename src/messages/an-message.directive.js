;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anMessage', function() {

            // jscs:disable
            var defaultTemplate = [
                '<div ng-style="message.styleContainer" class="aui-message aui-message-{{ message.severity }} {{ message.severity }}">',
                '   <p ng-if="message.title" class="title">',
                '       <span class="aui-icon icon-{{ message.severity }}"></span>',
                '       <strong ng-bind="message.title"></strong>',
                '   </p>',
                '   <div ng-style="message.styleMessageWrapper">',
                '       <p ng-if="message.message" ng-bind-html="message.message"></p>',
                '       <pre ng-if="message.details" ng-style="message.styleDetails" ng-bind-html="message.details"></pre>',
                '   </div>',
                '</div>'
            ].join('\n');
            // jscs:enable

            return {
                restrict: 'A',
                scope: {
                    message: '=anMessage'
                },
                template: defaultTemplate
            };
        }
    );

})(angular);
