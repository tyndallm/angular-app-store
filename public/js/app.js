'use strict';


angular.module('myApp', ['$strap.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
      when('/', {
        templateUrl: '/partials/welcome'
      })

  $routeProvider.
      when('/about', {
        templateUrl: '/partials/about'
      })

  $routeProvider.
      when('/apps', {
        controller: "AppListCtrl",
        templateUrl: '/partials/app-list'
      })

  $routeProvider. 
      when('/store', {
        controller: "AppStoreCtrl",
        templateUrl: '/partials/store'
      }) 

  $routeProvider.
      when('/apps/:app', { //using "/" relative prefixing before partials is mandatory for nested paths!!!!!
        controller: "AppDetailCtrl",
        templateUrl: '/partials/app-detail'
      })

  $routeProvider.
      when('/login', {
      	controller: 'CustomerController',
        templateUrl: '/partials/login'
      })

  $routeProvider.
      when('/help', {
        templateUrl: '/partials/help'
      })

  $routeProvider.otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);
}]);