;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anDatePicker', function() {
            return {
                restrict: 'A',
                link: function(scope, elm, attrs) {
                    var options = scope.$eval(attrs.anDatePicker) || {};
                    elm.datepicker(options);
                }
            };
        }
    );

})(angular);
