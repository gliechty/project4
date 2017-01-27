angular.module('fishrApp', ['ngRoute'])
	.config(function($routeProvider,$locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$routeProvider
		// main routes

		.when('/', {
			templateUrl: '/templates/about.html'
		})
		.when('/home', {
			templateUrl: '/templates/home.html'
		});

		// add routes to see saved pins

	});