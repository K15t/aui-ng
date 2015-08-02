;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg').
        factory('anConfirmDialog',
            function(anSimpleDialog, anDialogUtils) {

                var defaults = {
                    controller: ['$scope', 'dialog', function($scope, dialog) {
                        $scope.$submit = function() {
                            dialog.close(true);
                        };
                    }]
                };

                var create = function(opts) {
                    return anSimpleDialog.create(anDialogUtils.extendOptions(defaults, opts));
                };

                return {
                    create: create
                };
            }
    );
})(angular);
