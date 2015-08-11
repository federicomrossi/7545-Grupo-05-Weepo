 'use strict';

/**
 * @ngdoc function
 * @name app.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('RegisterCtrl', function ($scope, $http, $location, registerService) {

    $scope.newUser = {};
    
    $scope.acceptsConditions = false;

    $scope.submit = function(){
        $scope.matchPassword = ($scope.newUser.password == $scope.newUser.rePassword);
        if (!$scope.matchPassword){
          //Cambiar dsp por un ng-class en la vista
          alert("Las contraseñas deben coincidir");
          return;
        }

        if (!$scope.acceptsConditions){
         //Cambiar dsp por un ng-class en la vista
          alert("Debe aceptar las condiciones");
          return; 
        }

        registerService.create($scope.newUser).then(
          function (response) {
            console.log(response)         
          },
          function(response){
            console.log(response)         
            $location.url('/');
        });
    }
  });
