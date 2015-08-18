'use strict';

/**
 * @ngdoc overview
 * @name wwwApp
 * @description
 * # wwwApp
 *
 * Main module of the application where the routes are defined.
 */
angular.module('app')
  .config(function ($routeProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, authorizeService){
      return authorizeService.checkLoggedin($q, $timeout, $http, $location, $rootScope);
    };

    $routeProvider

      .when('/login', {
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'app/components/register/registerView.html',
        controller: 'RegisterCtrl'
      })      
      .when('/', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/main', {
        templateUrl: 'app/components/main/mainView.html',
        controller: 'MainCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/about', {
        templateUrl: 'app/components/about/aboutView.html',
        controller: 'AboutCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/campaigns', {
        templateUrl: 'app/components/campaigns/campaignsView.html',
        controller: 'CampaignsCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/events', {
        templateUrl: 'app/components/events/eventsView.html',
        controller: 'EventsCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .when('/assistence', {
        templateUrl: 'app/components/marketingAssisstants/marketingAssisstantsView.html',
        controller: 'MarketingAssisstantsCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
        .when('/new-campaign', {
        templateUrl: 'app/components/newCampaign/newCampaignView.html',
        controller: 'newCampaignCtrl',
        resolve: {
          isLoggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });