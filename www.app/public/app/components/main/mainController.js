'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', function ($scope, $http) {

  		var changeNoveltyToWeekly = function() {
  			console.log("Soy semanal");
        $scope.base_seguidores = $scope.mediciones["semanal"].base_seguidores;
        $scope.base_menciones = $scope.mediciones["semanal"].base_menciones;
        $scope.base_megusta = $scope.mediciones["semanal"].base_megusta;
        return null;
  		}

  		var changeNoveltyToMonthly = function() {
  			console.log("Soy mensual");
        $scope.base_seguidores = $scope.mediciones["mensual"].base_seguidores;
        $scope.base_menciones = $scope.mediciones["mensual"].base_menciones;
        $scope.base_megusta = $scope.mediciones["mensual"].base_megusta;
  			return null;
  		}

  		var changeNoveltyToAnually = function() {
  			console.log("Soy anual");
        $scope.base_seguidores = $scope.mediciones["anual"].base_seguidores;
        $scope.base_menciones = $scope.mediciones["anual"].base_menciones;
        $scope.base_megusta = $scope.mediciones["anual"].base_megusta;
  			return null;
  		}

  		$scope.option = {};
  		$scope.option.noveltySelected = "Semanal";
  		$scope.option.novelties = [ 
  			{ name: "Semanal", callback: changeNoveltyToWeekly },
  			{ name: "Mensual", callback: changeNoveltyToMonthly },
  			{ name: "Anual", callback: changeNoveltyToAnually }
  		];

  		$scope.changeNoveltiesOption = function(itemSelected) {
  			$scope.option.noveltySelected = itemSelected.name;
  			itemSelected.callback();

  		}

      /////////////////////////////////////////////////////////////////////////////
      // TEMP DATA

      // Get the campaigns of the brand
      var account_config = null;
      $scope.medidores = {};
      $scope.mediciones = {};

      $scope.base_seguidores = 0;
      $scope.base_menciones = 0;
      $scope.base_megusta = 0;


      $http.get('/get/data')
          .success(function(res){
            console.log(res);
            account_config = res;
            $scope.medidores["menciones"] = account_config.medidores.menciones;
            $scope.medidores["seguidores"] = account_config.medidores.seguidores;
            $scope.medidores["demografico"] = account_config.medidores.demografico;

            $scope.mediciones["seguidores"] = account_config.mediciones.seguidores;
            $scope.mediciones["menciones"] = account_config.mediciones.menciones;
            $scope.mediciones["megusta"] = account_config.mediciones.megusta;
            $scope.mediciones["anual"] = account_config.mediciones.anual;
            $scope.mediciones["mensual"] = account_config.mediciones.mensual;
            $scope.mediciones["semanal"] = account_config.mediciones.semanal;
            $scope.base_seguidores = $scope.mediciones["semanal"].base_seguidores;
            $scope.base_menciones = $scope.mediciones["semanal"].base_menciones;
            $scope.base_megusta = $scope.mediciones["semanal"].base_megusta;



            console.log($scope.medidores);
          })
          .error(function(e) {
              console.log(e);
          });

      $scope.updateData = function() {

        account_config.medidores.menciones = $scope.medidores["menciones"];
        account_config.medidores.seguidores = $scope.medidores["seguidores"];
        account_config.medidores.demografico = $scope.medidores["demografico"];
        account_config.mediciones.seguidores = $scope.mediciones["seguidores"];
        account_config.mediciones.menciones = $scope.mediciones["menciones"];
        account_config.mediciones.megusta = $scope.mediciones["megusta"];

        // Get the campaigns of the brand
        $http.post('/set/data', account_config)
            .success(function(res){
              
            })
            .error(function(e) {
                console.log(e);
            });
      }

      function seguidores() {
        $scope.mediciones["seguidores"] += Math.round(Math.random() * 2);
        $scope.updateData();
      }
      (function loop_seguidores() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 5000;
          setTimeout(function() {
                  seguidores();
                  loop_seguidores();  
          }, rand);
      }());


      function menciones() {
        $scope.mediciones["menciones"] += Math.round(Math.random() * 2);
        $scope.updateData();
      }
      (function loop_menciones() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 5000;
          setTimeout(function() {
                  menciones();
                  loop_menciones();  
          }, rand);
      }());


      function megusta() {
        $scope.mediciones["megusta"] += Math.round(Math.random() * 5);
        $scope.updateData();
      }
      (function loop_megusta() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 5000;
          setTimeout(function() {
                  megusta();
                  loop_megusta();  
          }, rand);
      }());

  });
