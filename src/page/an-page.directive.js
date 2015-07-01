;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anPage', function() {
            return {
                restrict: 'A',
                require: ['^anPages', 'anPage'],
                scope: true,
                priority: 99,
                controller: function($scope, $animate) {
                    var that = this;
                    var panels = [];
                    var currentPanelIdx = 0;

                    var uniqueId = (function() {
                        var id = 0;
                        return function() {
                            return id++;
                        };
                    })();

                    var normalizeIdx = function(idxAlias) {
                        if (typeof idxAlias === 'number') {
                            if (!panels[idxAlias]) {
                                return false;
                            }
                            return idxAlias;
                        }

                        for (var i = 0, len = panels.length; i < len; i++) {
                            if (panels[i].alias === idxAlias) {
                                return i;
                            }
                        }

                        return false;
                    };

                    this.addPanel = function(panel) {
                        panel.$id = uniqueId();
                        panels.push(panel);

                        $animate.addClass(panel.el, 'ng-hide');

                        // remove the panel by calling this function;
                        return function() {
                            for (var i = 0, len = panels.length; i < len; i++) {
                                if (panels[i].$id === panel.$id) {
                                    panels = panels.splice(i, 1);
                                    if (i === currentPanelIdx) {
                                        that.gotoPanel(0);
                                    }
                                    break;
                                }
                            }
                        };
                    };

                    this.gotoPanel = function(idxAlias) {
                        var idx = normalizeIdx(idxAlias);

                        if (idx === false) {
                            currentPanelIdx = 0;
                            return false;
                        }

                        $animate.addClass(panels[currentPanelIdx].el, 'ng-hide');
                        $animate.removeClass(panels[idx].el, 'ng-hide');

                        currentPanelIdx = idx;
                        return true;
                    };

                    this.hasNextPanel = function() {
                        return (currentPanelIdx + 1) < panels.length;
                    };

                    this.hasPrevPanel = function() {
                        return currentPanelIdx > 0;
                    };

                    this.nextPanel = function() {
                        return that.gotoPanel(currentPanelIdx + 1);
                    };

                    this.prevPanel = function() {
                        return that.gotoPanel(currentPanelIdx - 1);
                    };

                    $scope.$gotoPanel = this.gotoPanel;
                    $scope.$hasNextPanel = this.hasNextPanel;
                    $scope.$hasPrevPanel = this.hasPrevPanel;
                    $scope.$nextPanel = this.nextPanel;
                    $scope.$prevPanel = this.prevPanel;
                    $scope.$currentPanelIdx = function() {
                        return currentPanelIdx;
                    };
                },
                link: function(scope, elm, attrs, ctrls) {
                    var anPages = ctrls[0];
                    var anPage = ctrls[1];
                    var page = {el: elm};
                    if (attrs.anPage) {
                        page.alias = attrs.anPage;
                    }
                    var removePage = anPages.addPage(page);
                    anPage.gotoPanel(0);
                    scope.$on('$destroy', removePage);
                }
            };
        }
    );

})(angular);
