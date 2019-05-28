// Module
var weatherApp = angular.module("weatherApp", ['ngRoute','ngResource']);



// Controllers
weatherApp.controller("homeCtrl", ['$scope', 'cityService', homeController]);

function homeController($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch("city", function(){
    cityService.city = $scope.city;
  })
}

weatherApp.controller("forecastCtrl", ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService,weatherService) {
  $scope.city= cityService.city;
  $scope.days = $routeParams.days || '2';
  $scope.addweatherResult = weatherService.GetWeather($scope.city, $scope.days);

  $scope.convertToFarenheit = function(degK) {
    return Math.round((1.8 * (degK-273))+32);
  }
  // classes for high degree
  $scope.classes = function(degK) {
    return {
      "panel-body": true,
      "text-primary":$scope.convertToFarenheit(degK) < 62,
      "text-danger": $scope.convertToFarenheit(degK) >= 62
    }
  }

  //* just function
  $scope.convertToDate = function(dt) {
    return dt.substring(0,10);
  }
}]);
// Custom Directive

weatherApp.directive('weatherReport', function(){
  return {
    restrict: 'E',
    templateUrl: "directives/weatherReport.html",
    replace: true,
    scope: {
      weatherDay: '=', // object
      classes: '&', // object
      convertToStandard: "&", // function
      convertToDate: "&", // function
      dateFormat: "@" // string
    }
}});

// !Routes: moved to a seperate file for simplicity
// weatherApp.config(function($routeProvider){
//   $routeProvider
//     .when("/", {
//       templateUrl: "pages/home.html",
//       controller: "homeCtrl"
//     })
//     .when("/forecast", {
//       templateUrl: "pages/forecast.html",
//       controller: "forecastCtrl"
//     })
//     .when("/forecast/:days", {
//       templateUrl: "pages/forecast.html",
//       controller: "forecastCtrl"
//     })
// })