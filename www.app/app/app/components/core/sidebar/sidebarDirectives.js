'use strict';

/**
 * @ngdoc function
 * @name app.directive:activeMenuItem
 * @description
 * # activeMenuItemDirective
 * Directive of the app
 */
angular.module('app')
    .directive('activeMenuItem', function ($location) {
      return function ($scope, $el) {
        var links = $el.find('a'),
            path = function() { return $location.path(); };

        function addActiveClass (links, path) {

            angular.forEach(links, function (link) {
                var $link = angular.element(link);
                
                if ($link.hasClass('active')) {
                    $link.removeClass('active');
                } else if (link.hash === ('#' + path)) {
                    $link.addClass('active');
                }
            });
        }
    
        // Initial state
        addActiveClass(links, $location.path());
    
        $scope.$watch(path, function (newValue, oldValue) {
            if (newValue === oldValue) { return; }
            addActiveClass(links, $location.path());
        });
      };
    
    });