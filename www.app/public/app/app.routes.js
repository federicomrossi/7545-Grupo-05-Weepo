'use strict';

/**
 * @ngdoc overview
 * @name wwwApp
 * @description
 * # wwwApp
 *
 * Main module of the application where the routes are defined.
 */


var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, $window){

  // Initialize a new promise
  var deferred = $q.defer();

  // Make an AJAX call to check if the user is logged in - See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
  $http.get('/loggedin')
    .success(function(user){
      console.log("chequeando");
      // Authenticated
      if (user !== '0')
        deferred.resolve();

      // Not Authenticated
      else {
        console.log("No se encuentra loggeado.");
        deferred.reject();
        //$location.url('/login.html');
        $window.location.href = '/login.html';
      }
    })
    .error(function(e) {
      console.log("ERROR: " + e);
    });

  return deferred.promise;
};


angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl'/*,
        resolve: {
          loggedin: checkLoggedin
        }*/
      })
      .when('/login', {
        templateUrl: 'app/components/login/loginView.html',
        //controller: 'MainCtrl'
      })
      .when('/main', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
