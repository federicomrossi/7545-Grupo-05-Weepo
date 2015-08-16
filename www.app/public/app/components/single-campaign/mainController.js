'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', function ($scope) {

  		var changeNoveltyToWeekly = function() {
  			console.log("Soy semanal");
  			return null;
  		}

  		var changeNoveltyToMonthly = function() {
  			console.log("Soy mensual");
  			return null;
  		}

  		var changeNoveltyToAnually = function() {
  			console.log("Soy anual");
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

  		
  });
