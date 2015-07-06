;(function(angular) {
console.log('load');
    'use strict';

    angular.module('k15t.auiNg')
        .factory('anMessages', function() {
            var containers = {};

            var register = function(id, ctrl) {
                if (containers[id]) {
                    throw new Error('a container with this id already exists');
                }

                containers[id] = ctrl;

                return function() {
                    delete containers[id];
                };
            };

            var clearMessages = function(id) {
                if (!containers[id]) {
                    throw new Error('a container with id ' + id + ' does not exist');
                }

                containers[id].clearMessages();
            };

            var addMessage = function(id, opts) {
                if (!containers[id]) {
                    throw new Error('a container with id ' + id + ' does not exist');
                }

                containers[id].addMessage(opts);
            };

            return {
                register: register,
                clearMessages: clearMessages,
                addMessage: addMessage
            };
        }
    );

})(angular);
