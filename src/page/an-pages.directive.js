;(function(angular) {

    'use strict';

    angular.module('k15t.auiNg')
        .directive('anPages', function() {
            return {
                scope: true,
                restrict: 'A',
                priority: 100,
                require: 'anPages',
                controller: function($scope, $animate) {
                    var that = this;
                    var pages = [];
                    var currentPageIdx = 0;

                    var uniqueId = (function() {
                        var id = 0;
                        return function() {
                            return id++;
                        };
                    })();

                    var normalizeIdx = function(idxAlias) {
                        if (typeof idxAlias === 'number') {
                            if (!pages[idxAlias]) {
                                return false;
                            }
                            return idxAlias;
                        }

                        for (var i = 0, len = pages.length; i < len; i++) {
                            if (pages[i].alias === idxAlias) {
                                return i;
                            }
                        }

                        return false;
                    };

                    this.addPage = function(page) {
                        page.$id = uniqueId();
                        pages.push(page);

                        $animate.addClass(page.el, 'ng-hide');

                        // remove the page by calling this function;
                        return function() {
                            for (var i = 0, len = pages.length; i < len; i++) {
                                if (pages[i].$id === page.$id) {
                                    pages = pages.splice(i, 1);
                                    if (i === currentPageIdx) {
                                        that.gotoPage(0);
                                    }
                                    break;
                                }
                            }
                        };
                    };

                    this.gotoPage = function(idxAlias) {
                        var idx = normalizeIdx(idxAlias);

                        if (idx === false) {
                            currentPageIdx = 0;
                            return false;
                        }

                        $animate.addClass(pages[currentPageIdx].el, 'ng-hide');
                        $animate.removeClass(pages[idx].el, 'ng-hide');

                        currentPageIdx = idx;
                        return true;
                    };

                    this.hasNextPage = function() {
                        return (currentPageIdx + 1) < pages.length;
                    };

                    this.hasPrevPage = function() {
                        return currentPageIdx > 0;
                    };

                    this.nextPage = function() {
                        return that.gotoPage(currentPageIdx + 1);
                    };

                    this.prevPage = function() {
                        return that.gotoPage(currentPageIdx - 1);
                    };

                    $scope.$gotoPage = this.gotoPage;
                    $scope.$hasNextPage = this.hasNextPage;
                    $scope.$hasPrevPage = this.hasPrevPage;
                    $scope.$nextPage = this.nextPage;
                    $scope.$prevPage = this.prevPage;
                    $scope.$currentPageIdx = function() {
                        return currentPageIdx;
                    };
                },
                link: function(scope, element, attrs, anPages) {
                    anPages.gotoPage(0);
                }
            };
        }
    );

})(angular);
