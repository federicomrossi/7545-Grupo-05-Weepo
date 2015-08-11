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

    $scope.submit = function(){
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
