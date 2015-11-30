;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anSelect2', function($timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    var options = scope.$eval(attrs.anSelect2) || {};

                    if (angular.isUndefined(angular.element.fn.auiSelect2)) {
                        throw new Error('auiSelect2 is not installed');
                    }

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

                    // we are using $watch here, instead
                    // of modelCtrl.$render. $render does not
                    // get triggered if the value set is an
                    // object or an array.
                    scope.$watch(function() {
                        return ctrl.$modelValue;
                    }, function(newVal) {
                        $timeout(function() {
                            if (options.selectData) {
                                elm.auiSelect2('data', newVal);
                            } else {
                                elm.auiSelect2('val', newVal);
                            }
                        });
                    });

                    $timeout(function() {
                        elm.auiSelect2(options);
                    });
                }
            };
        }
    );

})(angular);
