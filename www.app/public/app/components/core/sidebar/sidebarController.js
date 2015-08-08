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

        // Forma de uso:
        //
        // { 'name': 'NOMBRE_ITEM', 'link': 'LINK_A_REDIRECCIONAR', 'icon': 'ICONO_FONT_AWASOME', 'subitems': [
        //    { 'name': 'NOMBRE_SUBITEM', 'link': 'LINK_A_REDIRECCIONAR', 'icon': 'ICONO_FONT_AWASOME'},
        // ]},
        //
        // NOTA: Si tiene subitems, el link del item debe contener '#' en lugar del link. Esto es para que aparezca
        // el ícono que permite expandir o contraer el submenú.
        //
        // Ejemplo:
        //
        // { 'name': 'Item', 'link': '#', 'icon': 'fa-dashboard', 'subitems': [
        //      { 'name': 'Subitem1',	'link': '#/main/index',	'icon': 'fa-circle-o'},
        //      { 'name': 'Subitem2',	'link': '#/main/about',	'icon': 'fa-circle-o'}
        // ]},

        { 'name': 'Main', 'link': '#/main', 'icon': 'fa-dashboard', 'subitems': [
        ]},
        { 'name': 'About', 'link': '#/about', 'icon': 'fa-info', 'subitems': [
        ]},
        { 'name': 'Clients', 'link': '#/clients', 'icon': 'fa-share-alt-square', 'subitems': [
        ]}
    ];

  });
