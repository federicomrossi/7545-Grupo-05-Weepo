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
        actualizarExito();
        return null;
  		}

  		var changeNoveltyToMonthly = function() {
  			console.log("Soy mensual");
        $scope.base_seguidores = $scope.mediciones["mensual"].base_seguidores;
        $scope.base_menciones = $scope.mediciones["mensual"].base_menciones;
        $scope.base_megusta = $scope.mediciones["mensual"].base_megusta;
        actualizarExito();
  			return null;
  		}

  		var changeNoveltyToAnually = function() {
  			console.log("Soy anual");
        $scope.base_seguidores = $scope.mediciones["anual"].base_seguidores;
        $scope.base_menciones = $scope.mediciones["anual"].base_menciones;
        $scope.base_megusta = $scope.mediciones["anual"].base_megusta;
        actualizarExito();
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

      var account_config = null;
      $scope.medidores = {};
      $scope.mediciones = {};

      $scope.base_seguidores = 0;
      $scope.base_menciones = 0;
      $scope.base_megusta = 0;

      $scope.crecimiento = 0;


      $http.get('/get/data')
          .success(function(res){
            console.log(res);
            account_config = res;
            $scope.medidores["menciones"] = account_config.medidores.menciones;
            $scope.medidores["seguidores"] = account_config.medidores.seguidores;
            $scope.medidores["megusta"] = account_config.medidores.megusta;

            $scope.mediciones["seguidores"] = account_config.mediciones.seguidores;
            $scope.mediciones["menciones"] = account_config.mediciones.menciones;
            $scope.mediciones["megusta"] = account_config.mediciones.megusta;
            $scope.mediciones["anual"] = account_config.mediciones.anual;
            $scope.mediciones["mensual"] = account_config.mediciones.mensual;
            $scope.mediciones["semanal"] = account_config.mediciones.semanal;
            $scope.base_seguidores = $scope.mediciones["semanal"].base_seguidores;
            $scope.base_menciones = $scope.mediciones["semanal"].base_menciones;
            $scope.base_megusta = $scope.mediciones["semanal"].base_megusta;

            console.log($scope.mediciones["anual"]);


            actualizarExito();

            console.log($scope.medidores);
          })
          .error(function(e) {
              console.log(e);
          });

      $scope.updateData = function() {

        account_config.medidores.menciones = $scope.medidores["menciones"];
        account_config.medidores.seguidores = $scope.medidores["seguidores"];
        account_config.medidores.megusta = $scope.medidores["megusta"];

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

        actualizarExito();
      }

      function seguidores() {
        $scope.mediciones["seguidores"] += Math.round(Math.random() * 2);
        $scope.updateData();
        actualizarExito();
      }
      (function loop_seguidores() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 7000;
          setTimeout(function() {
                  seguidores();
                  loop_seguidores();  
          }, rand);
      }());


      function menciones() {
        $scope.mediciones["menciones"] += Math.round(Math.random() * 2);
        $scope.updateData();
        actualizarExito();
      }
      (function loop_menciones() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 5500;
          setTimeout(function() {
                  menciones();
                  loop_menciones();  
          }, rand);
      }());


      function megusta() {
        $scope.mediciones["megusta"] += Math.round(Math.random() * 3);
        $scope.updateData();
        actualizarExito();
      }
      (function loop_megusta() {
          var rand = Math.round(Math.random() * (3000 - 500)) + 4000;
          setTimeout(function() {
                  megusta();
                  loop_megusta();  
          }, rand);
      }());




      function round(value, decimals) {
          return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

      function calcularCrecimiento(actual, anterior) {
        var val = round((actual - anterior) / parseFloat(anterior), 4);
        var per = parseFloat(val * 100);
        return round(per, 2);
      }

      function actualizarExito() {

        var crecimiento = parseFloat(0); 
        var p = $scope.option.noveltySelected.toLowerCase();

        if($scope.medidores["menciones"]) {
          var periodo_anterior_menciones = $scope.mediciones[p].periodo_anterior_menciones;
          var periodo_actual_menciones = $scope.mediciones[p].base_menciones + $scope.mediciones["menciones"];
          crecimiento += calcularCrecimiento(periodo_actual_menciones, periodo_anterior_menciones);
        }

        if($scope.medidores["seguidores"]) {
          var periodo_anterior_seguidores = $scope.mediciones[p].periodo_anterior_seguidores;
          var periodo_actual_seguidores = $scope.mediciones[p].base_seguidores + $scope.mediciones["seguidores"];
          crecimiento += calcularCrecimiento(periodo_actual_seguidores, periodo_anterior_seguidores);
        }

        if($scope.medidores["megusta"]) {
          var periodo_anterior_megusta = $scope.mediciones[p].periodo_anterior_megusta;
          var periodo_actual_megusta = $scope.mediciones[p].base_megusta + $scope.mediciones["megusta"];
          crecimiento += calcularCrecimiento(periodo_actual_megusta, periodo_anterior_megusta);
        }

        $scope.crecimiento = crecimiento;
      }

      
  });
