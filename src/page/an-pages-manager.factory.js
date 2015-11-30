;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .factory('anPagesManager', function() {
            var pages = {};

            var register = function(id, ctrl) {
                if (pages[id]) {
                    throw new Error('id already exists');
                }

                pages[id] = ctrl;

                return function() {
                    delete pages[id];
                };
            };

            var getById = function(id) {
                if (!pages[id]) {
                    throw new Error(id + ' does not exist');
                }

                return pages[id];
            };

            return {
                register: register,
                getById: getById
            };
        }
    );

})(angular);
