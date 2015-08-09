'use strict';

/**
 * @ngdoc function
 * @name app.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('SidebarCtrl', function ($scope, $element, $attrs, $location, authorizeService) {
  	

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

        { 'name': 'Inicio', 'link': '#/main', 'icon': 'fa-newspaper-o', 'subitems': [
        ]},
        { 'name': 'Administrar campañas', 'link': '#/campaigns', 'icon': 'fa-line-chart', 'subitems': [
        ]},
        { 'name': 'Administrar eventos', 'link': '#/events', 'icon': 'fa-calendar-check-o', 'subitems': [
        ]},
        { 'name': 'Asistente de Marketing', 'link': '#/assistence', 'icon': 'fa-user', 'subitems': [
        ]},
        { 'name': 'Administrar Plan', 'link': '#/plans', 'icon': 'fa-credit-card', 'subitems': [
        ]},
        { 'name': 'Configuración general', 'link': '#/config', 'icon': 'fa-cog', 'subitems': [
        ]}

    ];

  });
