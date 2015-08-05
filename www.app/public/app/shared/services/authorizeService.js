'use strict';

/**
 * @ngdoc function
 * @name app.service:authorizeService
 * @description
 * # authorizeService
 * Service of the app
 */
angular.module('app').factory('authorizeService', function ($rootScope, $q, $timeout, $http, $location) {
    
    var uriRedirectIfNotAuthorize = "/login";

    return {

        // Function to login into the server
        login: function(user, pass) {

            return $http.post('/login', {
                    username: user,
                    password: pass,
                });
        },

        // The server session is closed.
        logout: function() {
            $http.post('/logout');
            $rootScope.isLoggedin = false;
            $location.url(uriRedirectIfNotAuthorize);
        },

        // Check if the user is loggedin, returning true in that case
        // or false otherwise.
        isLoggedin: function(callback) {

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin')
                .success(function(user){
                    // Authenticated
                    if (user !== '0')
                      callback();
                    // Not Authenticated
                    else 
                      return;
                })
                .error(function(e) {
                    console.log(e);
                });
        },

        // Returns a promise that checks if the users has been logged.
        // If not, it will be redirected to the login section
        checkLoggedin: function($q, $timeout, $http, $location, $rootScope){
            
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in - See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
            $http.get('/loggedin')
            .success(function(user){
              // Authenticated
              if (user !== '0') {

                $rootScope.isLoggedin = true;
                $rootScope.user = user;
                deferred.resolve();
              }

              // Not Authenticated
              else {
                deferred.reject();
                $location.url(uriRedirectIfNotAuthorize);
              }
            })
            .error(function(e) {
              console.log(e);
            });

            return deferred.promise;
        }
    };
});