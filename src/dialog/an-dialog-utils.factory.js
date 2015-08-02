;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .factory('anDialogUtils', function() {

            var extendLocals = function(defaultLocals, optsLocals) {
                defaultLocals = defaultLocals || {};
                optsLocals = optsLocals || {};

                var locals = angular.extend({}, defaultLocals, optsLocals);
                locals.labels = angular.extend({}, defaultLocals.labels || {}, optsLocals.labels || {});
                locals.classes = angular.extend({}, defaultLocals.classes || {}, optsLocals.classes || {});
                locals.styles = angular.extend({}, defaultLocals.styles || {}, optsLocals.styles || {});

                return locals;
            };

            var extendOptions = function() {
                var target = {};
                var args = [].slice.call(arguments, 0);

                args.forEach(function(arg) {
                    arg = arg || {};
                    target = angular.extend({}, target, arg, {locals: extendLocals(target.locals, arg.locals)})
                });

                return target;
            };

            return {
                extendOptions: extendOptions
            };
        }
    );

})(angular);
