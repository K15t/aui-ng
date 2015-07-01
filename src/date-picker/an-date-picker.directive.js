;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anDatePicker', function() {
            return {
                restrict: 'A',
                link: function(scope, elm, attrs) {
                    var $el = AJS.$(elm);
                    var options = scope.$eval(attrs.anDatePicker) || {};
                    $el.datepicker(options);
                }
            };
        }
    );

})(angular);
