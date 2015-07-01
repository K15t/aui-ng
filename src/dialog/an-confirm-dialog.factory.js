;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg').
        factory('anConfirmDialog',
            function(anSimpleDialog) {

                var defaults = {
                    controller: ['$scope', 'dialog', function($scope, dialog) {
                        $scope.$submit = function() {
                            dialog.close(true);
                        };
                    }]
                };

                var create = function(opts) {
                    return anSimpleDialog.create(angular.extend({}, defaults, opts));
                };

                return {
                    create: create
                };
            }
    );
})(angular);
