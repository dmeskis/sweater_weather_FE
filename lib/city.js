function getLocation() {
  let params = window.location.search.substr(1)
  array = params.split('=')
  return array[1]
}

let city = getLocation()
const farenheit = '°F'
const celcius = '°C'
let temperatureScale = farenheit
let forecastData
let forecastAttributes
let currentTemperature // unparsed current temperature
let displayCurrentTemperature
let displayCity
let displayState
let displayHigh
let displayLow
let displayFeelsLike
let displayDayDescription
let displayNightDescription
let displayHumidity
let displayUvIndex
let displayVisibility

const url = `https://sweater-weather-app.herokuapp.com/api/v1/forecast?location=${city}`


fetch(url).then(
        function(u){ return u.json();}
      ).then((json) => {
          forecastData = json;
          forecastAttributes = forecastData["data"]["attributes"];
        }
      ).then(assignVariables)
      .then(buildPage)
      .catch((error) => console.error({error}));

function assignVariables() {
  currentTemperature = forecastAttributes["current_temperature"];
  displayCurrentTemperature = Math.round(currentTemperature);
  displayCity = forecastAttributes["city"];
  displayState = forecastAttributes["state"];
  displayHigh = Math.round(forecastAttributes['high_temperature']);
  displayLow = Math.round(forecastAttributes['low_temperature']);
  displayFeelsLike = Math.round(forecastAttributes['feels_like']);
  displayDayDescription = forecastAttributes['day_description'];
  displayNightDescription = forecastAttributes['night_description'];
  displayUvIndex = forecastAttributes['uv_index'];
  displayVisibility = forecastAttributes['visibility'];
  displayHumidity = Math.floor(forecastAttributes['humidity'] * 100);
}

function buildPage() {
  $('#city-state').html(`${displayCity}, ${displayState}`);
  $('#current-temperature').html(`${displayCurrentTemperature}${temperatureScale}`);
  $('#high').html(`${displayHigh}${temperatureScale}`);
  $('#feels_like').html(`${displayFeelsLike}${temperatureScale}`);
  $('#feels_like2').html(`${displayFeelsLike}${temperatureScale}`);
  $('#low').html(`${displayLow}${temperatureScale}`);
  $('#day_description').html(`${displayDayDescription}`);
  $('#night_description').html(`${displayNightDescription}`);
  $('#visibility').html(`${displayVisibility}`);
  $('#humidity').html(`${displayHumidity}%`);
  startTime();
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var date = today.toLocaleDateString().slice(0, 5);
    if (date.substr(-1) === '/') {
      date = date.slice(0, -1);
    }
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    document.getElementById('date').innerHTML = date
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// function buildPage() {
//   $('#location').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
// }
