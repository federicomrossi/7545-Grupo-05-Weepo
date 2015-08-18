'use strict';

/**
 * @ngdoc function
 * @name app.controller:CampaignsCtrl
 * @description
 * # CampaignsCtrl
 * Controller of the app
 */
angular.module('app')
  	.controller('CampaignsCtrl', function ($scope, $http) {

  		// Get the campaigns of the brand
		$http.get('/campaign/get/1')
		    .success(function(res){
		       
		    	$scope.campaigns = res;
		    	$scope.active_campaigns = 0;
		    	$scope.campaigns.forEach(function(item) {
				    if(item.state == true)
				    	$scope.active_campaigns++;
				});
		    })
		    .error(function(e) {
		        console.log(e);
		    });


		$scope.convertDate = function(inputFormat) {
			function pad(s) { return (s < 10) ? '0' + s : s; }
			var d = new Date(inputFormat);
			return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
		}

	});
