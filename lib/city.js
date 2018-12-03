
let city = getLocation();
const farenheit = '°F';
const celcius = '°C';
const url = `https://sweater-weather-app.herokuapp.com/api/v1/forecast?location=${city}`;
const bgUrl = `https://sweater-weather-app.herokuapp.com/api/v1/backgrounds?location=${city}`;
const favUrl = `https://sweater-weather-app.herokuapp.com/api/v1/favorites?api_key=${getCookie('api_key')}`;

const weekdays = new Array(7);
weekdays[0]="Sunday";
weekdays[1]="Monday";
weekdays[2]="Tuesday";
weekdays[3]="Wednesday";
weekdays[4]="Thursday";
weekdays[5]="Friday";
weekdays[6]="Saturday";

let temperatureScale = farenheit; // sets default temperature scale to farenheit
let backgroundData;
let favoritesData;
let bgImage;
let forecastData;
let postedFavoriteData;
let weeklyForecastData;
let hourlyForecastData;
let todaysData;
let forecastAttributes;
let currentTemperature; // unparsed current temperature
let displayCurrentTemperature;
let displayCity;
let displayState;
let displayHigh;
let displayLow;
let displayFeelsLike;
let displayDayDescription;
let displayNightDescription;
let displayHumidity;
let displayUvIndex;
let displayVisibility;

function buildNavBar() {
    $('.nav-bar').html('');
    var api_key = getCookie("api_key");
    if (api_key != "") {
      $('.nav-bar').append(`
        <div class='search-bar'>
          <form action="./city.html">
            <input type="text" name="location" onfocus="this.value=''" value="City, state...">
            <input class='sexy-submit' type="submit" value="Search">
          </form>
        </div>
        <div class='user-options align-right'>
          <a id='logout'>Log Out</a> | <a href='./register.html'>Register</a>
        </div>`
      )
    } else {
      $('.nav-bar').append(`
        <div class='search-bar'>
          <form action="./city.html">
            <input type="text" name="location" onfocus="this.value=''" value="City, state...">
            <input class='sexy-submit' type="submit" value="Search">
          </form>
        </div>
        <div class='user-options align-right'>
          <a href='./login.html'>Login</a> | <a href='./register.html'>Register</a>
        </div>`
      )
    }
}

// Gets favorite data
const getFavoriteData = function() {
  fetch(favUrl).then(
  function(u){ return u.json();}
).then((json) => {
  favoritesData = json;
}).then(buildFavorite)
  .catch((error) => console.error({error}));
}

getFavoriteData()

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getLocation() {
  let params = window.location.search.substr(1)
  array = params.split('=')
  return array[1]
}
// Gets background data
fetch(bgUrl).then(
  function(u){ return u.json();}
).then((json) => {
  backgroundData = json;
  bgImage = randomlySelectImage(backgroundData);
}).then(setBackground)
  .catch((error) => console.error({error}));

function buildFavorite() {
  $('#favorite-button').html('');
  var favorites = favoritesData["data"];
  debugger;
  if (favorites === undefined || favorites.length == 0) {
    $('#favorite-button').append(`
      <img class='img-large' src='./styles/svg/heart.svg'>
      `)
  } else if (cityFavorited == true) {
    $('#favorite-button').append(`
      <img class='img-large' src='./styles/svg/favorite-heart-button.svg'>
      `)
  } else {
    $('#favorite-button').append(`
      <img class='img-large' src='./styles/svg/heart.svg'>
      `)
  }
}

function setBackground() {
  $('#background').css({'background-image': `url(${bgImage})`});
}

function randomlySelectImage(data) {
  var random = data["photos"]["photo"][Math.floor(Math.random() * data["photos"]["photo"].length)];
  if (random["url_o"] != undefined) {
    return random["url_o"];
  } else {
    return `http://farm${random["farm"]}.staticflickr.com/${random["server"]}/${random["id"]}_${random["secret"]}_b.jpg`
  }
}


// Gets forecast data
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
  weeklyForecastData = forecastAttributes['weekly_forecast'];
  hourlyForecastData = forecastAttributes['hourly_forecast'].slice(0, 7);
  todaysData = weeklyForecastData.shift();
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
  $('#uv_index').html(`${displayUvIndex}`);
  $('#current-image').append(`<img class='img-large' src='./styles/svg/${hourlyForecastData[0]["icon"]}.svg' alt='Sun and Clouds'/>`)
  buildHourlyForecast();
  buildWeeklyForecast();
  startTime();
}

function buildHourlyForecast() {
  hourlyForecastData.forEach(function(hour) {
    let utcSeconds = hour['time'];
    let date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    let icon = hour['icon'];
    let temperature = Math.round(hour['temperature']);
    let displayHour = parseHour(date.getHours());
    $('#hourly-time').append(`
      <span class='box2'><span class='time'>${displayHour}</span></span>
      `);
    $('#image').append(`
      <span class='box2'><img src='./styles/svg/${icon}.svg'></span>
      `);
    $('#hourly-temperature').append(`
      <span class='box2'><span class='temperature-small' id='hourly-temp'>${temperature}${temperatureScale}</span></span>
      `);
  });
};

function buildWeeklyForecast() {
  weeklyForecastData.forEach(function(forecast) {
    let utcSeconds = forecast["time"];
    let date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    let humidity = Math.floor(forecast['humidity'] * 100)
    let lowTemp = Math.round(forecast['apparentTemperatureLow'])
    let highTemp = Math.round(forecast['apparentTemperatureHigh'])
    $('#weekly-forecast').append(`
    <div class='weekly-forecast'>
      <div class='row'>
        <span class='box2'>
          <span class='weekday-title'>${weekdays[date.getDay()]}</span>
        </span>
        <span class='box'>
          <img class='img-med' src='./styles/svg/${forecast["icon"]}.svg' alt='${forecast["summary"]} title='${forecast["summary"]}' '/>
        </span class='box'>
        <span class='box'>
          ${humidity}%<img class='img-small' src="./styles/drop.svg" alt="Humidity">
        </span>
        <span class='box'>
          ${lowTemp}${temperatureScale}<img class='img-small' src="./styles/arrow-pointing-down.svg" alt="Low Temp">
        </span>
        <span class='box'>
          ${highTemp}${temperatureScale}<img class='img-small' src="./styles/arrow-up.svg" alt="High Temp">
        </span>
      </div>
      `);
  });
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

function parseHour(time) {
  if (time === 0) {
    return '12am'
  } else if (time > 12) {
    return `${time - 12}pm`
  } else {
    return `${time}am`
  }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function logOut() {
  eraseCookie('api_key');
  alert('Successfully logged out');
  buildNavBar();
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

const favoriteCity = (event) => {
  if (cityFavorited == false) {
    event.preventDefault();
   fetch(`https://sweater-weather-app.herokuapp.com/api/v1/favorites?api_key=${getCookie('api_key')}`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json'},
   })
   .then(function(u){ return u.json();}
  ).then((json) => {
    postedFavoriteData = json;
  }).then((json) => {
    buildFavorite();
  })
   .catch((error) => console.error({error}));
 } else {
   event.preventDefault();
  fetch(`https://sweater-weather-app.herokuapp.com/api/v1/favorites?api_key=${getCookie('api_key')}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
  })
  .then(function(u){ return u.json();}
 ).then((json) => {
   postedFavoriteData = json;
 }).then((json) => {
   buildFavorite();
 })
  .catch((error) => console.error({error}));

 }

};



function cityFavorited() {
  var favorites = favoritesData["data"];
  var current_loc = displayCity + ', ' + displayState;
  var result = false;
  favorites.forEach(function(favorite) {
    if (favorite["attributes"]["location"] === current_loc) {
      var result = true;
    }
  });
  return result;
}

buildNavBar();

$('#logout').click(logOut);
$('#favorite-button').click(favoriteCity);
