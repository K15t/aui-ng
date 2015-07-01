;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anTooltip', function() {
            return {
                restrict: 'A',
                link: function(scope, elm, attrs) {

                    var compile = function() {
                        var options = scope.$eval(attrs.anTooltipOptions) || {};

                        options.title = function() {
                            return scope.$eval(attrs.anTooltip);
                        };

                        AJS.$(elm).tooltip(options);
                    };

                    scope.$watch(attrs.anTooltip, compile);

                    compile();
                }
            };
        }
    );

})(angular);
