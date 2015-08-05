'use strict';

/**
 * @ngdoc function
 * @name app.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LoginCtrl', function ($scope, $rootScope, $http, $location, authorizeService) {

    // If it's already loggedin, we redirect to the main page.
    authorizeService.isLoggedin(function() {
        $location.url('/');
    });

    // In other case
    $scope.isLoggedin = false;
    $scope.user = {}; // This object will be filled by the form

    // Register the login() function
    $scope.login = function(){
      $http.post('/login', {
        username: $scope.user.username,
        password: $scope.user.password,
      })
      .success(function(user){
        // No error: authentication OK
        $rootScope.message = 'Authentication successful!';
        $location.url('/');
      })
      .error(function(){
        // Error: authentication failed
        $rootScope.message = 'Authentication failed.';
        $location.url('/login');
      });
    };
  });
