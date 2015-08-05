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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, authorizeService){
      return authorizeService.checkLoggedin($q, $timeout, $http, $location, $rootScope);
    };

    $routeProvider

      .when('/login', {
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl'
      })
      .when('/', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/main', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });