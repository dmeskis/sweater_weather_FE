function getLocation() {
  let params = window.location.search.substr(1)
  array = params.split('=')
  return array[1]
}

let city = getLocation()

const url = `https://sweater-weather-app.herokuapp.com/api/v1/forecast?location=${city}`
let forecastData
let forecastAttributes

fetch(url).then(
        function(u){ return u.json();}
      ).then(
        function(json){
          forecastData = json;
          forecastAttributes = forecastData["data"]["attributes"]
        }
      ).then(
        $('.location').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
      )

      $(document).ready(function() {
        clockUpdate();
        setInterval(clockUpdate, 1000);
      })

// function buildPage() {
//   $('#location').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
// }
