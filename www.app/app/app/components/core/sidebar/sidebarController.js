'use strict';

/**
 * @ngdoc function
 * @name app.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SidebarCtrl', function ($scope, $element, $attrs, $location) {
  	

	$scope.menuItems = [
        /*{ 'name': 'Dashboard', 'link': '#', 'icon': 'fa-dashboard', 'subitems': [
        	{ 'name': 'Subitem1',	'link': '#/main/index',	'icon': 'fa-circle-o'},
        	{ 'name': 'Subitem2',	'link': '#/main/about',	'icon': 'fa-circle-o'}
        ]},*/
        { 'name': 'Main', 'link': '#/main', 'icon': 'fa-dashboard', 'subitems': [
        ]},
        { 'name': 'About', 'link': '#/about', 'icon': 'fa-info', 'subitems': [
        ]}
    ];

  });
