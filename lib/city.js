function getLocation() {
  let params = window.location.search.substr(1)
  array = params.split('=')
  return array[1]
}

let city = getLocation()

const url = `https://sweater-weather-app.herokuapp.com/api/v1/forecast?location=${city}`
let forecastData
let forecastAttributes

// async function fetchForecast(endpoint) {
//   const res = await fetch(endpoint);
//   let data = await res.json();
//
//   data = data.map(user => user.username);
//
//   console.log(data);
// }


// const request = async() => {
//   const response = await fetch(url);
//   const json = await response.json();
// }

// fetchForecast(url)


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

// function buildPage() {
//   $('#location').html(`${forecastAttributes["city"]}, ${forecastAttributes["state"]}`)
// }
