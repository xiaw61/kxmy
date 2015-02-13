var kexingApp = angular.module('kexingApp', [
	'ngRoute',
  'kexingAppControllers',
]);

kexingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '../views/home.html'
      }).
      when('/contact', {
        templateUrl: '../views/contact.html'
 
      }).
      when('/intro', {
        templateUrl: '../views/intro.html'
 
      }).
      when('/display', {
        templateUrl: '../views/display2.html'
 
      }).
      when('/login', {
        templateUrl: '../views/login.html'
 
      }).
       when('/admin', {
        templateUrl: '../views/save.html'
 
      }).
        when('/display2', {
        templateUrl: '../views/display2.html'
 
      }).
      otherwise({
        templateUrl: '../views/home.html'
      });
  }]);

