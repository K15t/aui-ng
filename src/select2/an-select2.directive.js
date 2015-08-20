;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anSelect2', function($timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    var options = scope.$eval(attrs.anSelect2) || {};

                    var onChange = function(e) {
                        var data = elm.auiSelect2(options.selectData ? 'data' : 'val');
                        e.stopImmediatePropagation();
                        if (angular.isArray(data)) {
                            ctrl.$setViewValue(data.length ? data : void 0);
                        } else {
                            ctrl.$setViewValue(data);
                        }
                    };

                    elm.on('change', onChange);

                    scope.$on('$destroy', function() {
                        elm.auiSelect2('destroy');
                        elm.off('change', onChange);
                    });

                    ctrl.$render = function() {
                        $timeout(function() {
                            if (options.selectData) {
                                elm.auiSelect2('data', ctrl.$modelValue);
                            } else {
                                elm.auiSelect2('val', ctrl.$viewValue);
                            }
                        });
                    };

                    $timeout(function() {
                        elm.auiSelect2(options);
                    });
                }
            };
        }
    );

})(angular);
