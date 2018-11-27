const url = 'https://sweater-weather-app.herokuapp.com/api/v1/forecast?location=denver,co'
let forecastData
let forecastAttributes

fetch(url).then(
        function(u){ return u.json();}
      ).then(
        function(json){
          forecastData = json;
          forecastAttributes = forecastData["data"]["attributes"]
        }
      )

// function buildPage() {
//   $('#location').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
// }
