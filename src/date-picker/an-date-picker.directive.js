;(function(angular) {

    'use strict';

    /**
     * Directive which wraps the jquery date picker for more details about the different options please
     * see http://api.jqueryui.com/datepicker.
     *
     * Additionally the following callback handler can be defined:
     * - onChange: will be called if the user leaving the input field. The date as string and the date will be provided to the handler.
     * - onSelect: will be called if the user opened the date picker and selected a day. The date as string and the date will be
     *             provided to the handler.
     */
    angular.module('k15t.auiNg')
        .directive('anDatePicker', function() {
            return {
                restrict: 'A',
                link: function(scope, elm, attrs) {
                    var options = scope.$eval(attrs.anDatePicker) || {};
                    if (options.onChange) {
                        elm.live("blur", function() {
                            options.onChange(elm.datepicker("option", "currentText"), elm.datepicker("getDate"));
                        });
                    }
                    if (options.onSelect) {
                        var onSelectOrg = options.onSelect;
                        options.onSelect = function() {
                            onSelectOrg(elm.datepicker("option", "currentText"), elm.datepicker("getDate"));
                        }
                    }
                    elm.datepicker(options);
                }
            };
        }
    );

})(angular);
