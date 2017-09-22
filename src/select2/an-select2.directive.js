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

                    if (angular.isFunction(ctrl.$overrideModelOptions)) {
                        // if selectData is set to true and an-select2 is bound
                        // to an input field then ng-change is called two times (see #4).
                        // this is a small workaround which prevents the first ng-change from
                        // happening.
                        // notice that this requires angular >= 1.6 in order to work.
                        ctrl.$overrideModelOptions({
                            debounce: 5
                        });
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
                            var select2Opts = elm.data('select2').opts;

                            if (options.selectData) {
                                elm.auiSelect2('data', newVal);
                            } else {
                                // if a query function is used but initSelection is not set
                                // then an error will be thrown in the console if we try to
                                // update the select2 value. that's why we don't support that scenario
                                // at all atm.
                                if (select2Opts.query && !select2Opts.initSelection && newVal !== null) {
                                    console.warn('anSelect2: initSelection should be set if a query function is defined,' +
                                    ' otherwise it can lead to inconsistities between ngModel and the value which is displayed in select2');
                                } else {
                                    elm.auiSelect2('val', newVal);
                                }
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
