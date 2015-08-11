'use strict';

/**
 * @ngdoc function
 * @name app.service:registerService
 * @description
 * # authorizeService
 * Service of the app
 */
angular.module('app').factory('registerService', function ($rootScope, $q, $timeout, $http, $location) {
    
    var _create = function(data){
        console.log(data)
    }

    return {
        create: function(data){
            return _create(data);
        }
    }
});