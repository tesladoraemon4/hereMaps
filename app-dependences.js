'use strict';

angular.module('pagina',['ui.router','hereMapa'])
.config(function($urlRouterProvider, $stateProvider) {


	$stateProvider
	.state('/',{
		url:'/',
		templateUrl : "templates/home.html",
		controller:'ControlX'
	});


});