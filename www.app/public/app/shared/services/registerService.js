'use strict';

/**
 * @ngdoc function
 * @name app.service:registerService
 * @description
 * # authorizeService
 * Service of the app
 */
angular.module('app').factory('registerService', function ($rootScope, $q, $timeout, $http, $location) {
    
    var _validateUser = function(user){
        console.log("_validateUser " +  user.username)
        return true;
        /*var query = "SELECT user_id FROM Users WHERE username =" + user.username + ";";
        db.query(query);*/
    }

    var _create = function(data){
        var deferred = $q.defer();
        console.log(data)
        //validate user
        if (_validateUser(data.user)){
            deferred.resolve();
        }
        
        
        
        return deferred.promise;
    }

    return {
        create: function(data){
            return _create(data);
        }
    }
});