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
    $scope.user = {}; // This object will be filled by the form

    // Register the login() function
    $scope.login = function(){
      authorizeService.login($scope.user.username, $scope.user.password)
      .success(function(user){
        // No error: authentication OK
        $scope.message = 'Autenticación satisfactoria!';
        $location.url('/');
      })
      .error(function(){
        // Error: authentication failed
        $scope.message = 'El usuario y/o contraseña son inválidos. Por favor vuelva a ingresarlos correctamente.';
        $scope.loginFailed = true;
      });
    };
  });
