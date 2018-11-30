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
      ).then((json) => {
          forecastData = json;
          forecastAttributes = forecastData["data"]["attributes"];
        }
      ).then(buildPage )
      .catch((error) => console.error({error}));

// $(document).ready(function() {
//   clockUpdate();
//   setInterval(clockUpdate, 1000);
// })

function buildPage() {
  $('#city-state').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var date = today.toLocaleDateString().slice(0, 5);
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
