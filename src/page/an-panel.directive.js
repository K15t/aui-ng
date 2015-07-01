;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anPanel', function() {
            return {
                restrict: 'A',
                require: '^anPage',
                scope: true,
                priority: 98,
                link: function(scope, elm, attrs, anPage) {
                    var panel = {el: elm};
                    if (attrs.anPanel) {
                        panel.alias = attrs.anPanel;
                    }
                    var removePanel = anPage.addPanel(panel);
                    scope.$on('$destroy', removePanel);
                }
            };
        }
    );

})(angular);
