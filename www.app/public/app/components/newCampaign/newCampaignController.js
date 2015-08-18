'use strict';

/**
 * @ngdoc function
 * @name app.controller:newCampaignCtrl
 * @description
 * # newCampaignCtrl
 * Controller of the app's New Campaign page
 */
angular.module('app')
	.controller('newCampaignCtrl', function ($scope, $http, $location) {

		var formatDate = function(date) {
		    var d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) month = '0' + month;
		    if (day.length < 2) day = '0' + day;

		    return [year, month, day].join('-');
		}

		$scope.add_campaign = function() {
			
			var today = new Date();
			
			var post_data = {
				name: $scope.campaign_name,
				description: $scope.campaign_description,
				image_url: $scope.campaign_img_url,
				dateCreation: formatDate(today),
				dateStart: $scope.campaign_date_start,
				dateFinish: $scope.campaign_date_finish
			};

			// Get the campaigns of the brand
			$http.post('/campaign/new', post_data)
			    .success(function(res){
			       
			    	$location.url('/campaigns');
			    })
			    .error(function(e) {
			        console.log(e);
			    });
		};

		$scope.uploadFile = function(files) {

		    var fd = new FormData();
		    fd.append("images", files[0]);
		    fd.append("old_image_url", $scope.campaign_img_url);

		    $http.post("/campaign/uploadImage", fd, {
		        withCredentials: true,
		        headers: {'Content-Type': undefined },
		        transformRequest: angular.identity
		    })
	    	.success(function(res){
		    	$scope.campaign_img_url = res.image_url;
		    })
		    .error(function(e) {
		        console.log(e);
		    });
		};		
  });