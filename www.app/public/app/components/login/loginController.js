'use strict';

/**
 * @ngdoc function
 * @name app.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LoginCtrl', function ($scope, $http, $location, authorizeService) {

    // If it's already loggedin, we redirect to the main page.
    authorizeService.isLoggedin(function() {
        $location.url('/');
    });

    // In other case
    $scope.isLoggedin = false;
    $scope.user = {};               // This object will be filled by the form
    $scope.loginAttempts = 0;       // Attempts counter

    // Register the login() function
    $scope.login = function(){
      
      $scope.loginFailed = false;

      // TASK: This will be changed to check the number of attempts, and if it exceeds
      // a maximum, the user login will be blocked for a while to avoid brute
      // force attacks
      $scope.loginAttempts++;

      authorizeService.login($scope.user.username, $scope.user.password)
      .success(function(user){
        // No error: authentication OK
        $location.url('/');
      })
      .error(function(){
        // Error: authentication failed
        $scope.message = 'El usuario y/o contraseña son inválidos. Por favor vuelva a ingresarlos correctamente.';
        $scope.loginFailed = true;
        $scope.user.password = "";
      });
    };
  });
