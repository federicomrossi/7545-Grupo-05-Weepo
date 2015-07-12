/**
 * @ngdoc function
 * @name app.directive:preventDefault
 * @description
 * # preventDefaultDirective
 * Directive of the app
 */
angular.module('app')
	.directive('preventDefault', function() {
        'use strict';
    
		var linkFn = function (scope, element) {
	        $(element).on('click', function (event) {
	            event.preventDefault();
	        });
	    };

	    return {
	        restrict: 'A',
	        link: linkFn
	    };
	});