'use strict';

/**
 * @ngdoc function
 * @name app.service:registerService
 * @description
 * # authorizeService
 * Service of the app
 */
angular.module('app').factory('registerService', function ($rootScope, $q, $timeout, $http, $location,DataBaseService) {
    
    var _create = function(data){
        var deferred = $q.defer();
        console.log(data)
        
        //Crear user
        /* Deberia hacer un llamado al api-rest creando el usuario*/
       
        /*$http({method: "POST", url: "localhost:3000/users",args: data}).
        then(function(response) {
        console.log(response)
         deferred.resolve();
        }, function(response) {
        console.log(response)
        deferred.reject();
        });*/
    };
        
        return deferred.promise;
    }

    return {
        create: function(data){
            return _create(data);
        }
    }
});