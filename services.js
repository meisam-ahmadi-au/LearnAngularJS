// Custom Service
weatherApp.service("cityService", function(){
  this.city = "London";
})

weatherApp.service("weatherService",[ "$resource",  function($resource){
  var key = "f72a37ada5d56dc2fe63e20278c8ddac";

  this.GetWeather = function(city, days) {
    var weatherAPI = $resource("https://api.openweathermap.org/data/2.5/forecast");
    return weatherAPI.get({ q: city, cnt: days, appid: key})
  }
}])