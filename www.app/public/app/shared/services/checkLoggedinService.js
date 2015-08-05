/**
 * @ngdoc function
 * @name app.service:CheckLoggedinService
 * @description
 * # CheckLoggedinService
 * Service of the app
 */
angular.module('app').factory('CheckLoggedinService', function ($q, $timeout, $http, $location, $rootScope) {
     return {
         getWeather: function() {
             // the $http API is based on the deferred/promise APIs exposed by the $q service
             // so it returns a promise for us by default
             return $http.get('http://fishing-weather-api.com/sunday/afternoon')
                 .then(function(response) {
                     if (typeof response.data === 'object') {
                         return response.data;
                     } else {
                         // invalid response
                         return $q.reject(response.data);
                     }

                 }, function(response) {
                     // something went wrong
                     return $q.reject(response.data);
                 });
         }
     };
});