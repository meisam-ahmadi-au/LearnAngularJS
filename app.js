// Module
var weatherApp = angular.module("weatherApp", ['ngRoute','ngResource']);

// Custom Service
weatherApp.service("cityService", function(){
  this.city = "London";
  this.key = "f72a37ada5d56dc2fe63e20278c8ddac";
})

// Controllers
weatherApp.controller("homeCtrl", ['$scope', 'cityService', homeController]);

function homeController($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch("city", function(){
    cityService.city = $scope.city;
  })
}

weatherApp.controller("forecastCtrl", ['$scope', '$resource', '$routeParams', 'cityService',  function($scope, $resource, $routeParams, cityService) {
  $scope.city= cityService.city;
  $scope.days = $routeParams.days || '2';
  console.log(cityService.key)
  var weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast");
  $scope.weatherResult = weatherAPI.get({ q: cityService.city, cnt: $scope.days, appid: cityService.key})
  $scope.convertToFarenheit = function(degK) {
    return Math.round((1.8 * (degK-273))+32);
  }

  //* just function
  $scope.convertToDate = function(dt) {
    return dt.substring(0,10);
  }

  console.log($scope.weatherResult);
}]);
// Custom Directive

weatherApp.directive('weatherReport', function(){
  return {
    restrict: 'E',
    templateUrl: "directives/weatherReport.html",
    replace: true,
    scope: {
      weatherDay: '=', // object
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