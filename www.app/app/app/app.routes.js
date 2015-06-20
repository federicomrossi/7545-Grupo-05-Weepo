'use strict';

/**
 * @ngdoc overview
 * @name wwwApp
 * @description
 * # wwwApp
 *
 * Main module of the application where the routes are defined.
 */
angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
