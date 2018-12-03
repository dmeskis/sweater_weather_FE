let loginData;

const logIn = (event) => {
  event.preventDefault();
  let email = $('#email').val();
  let password = $('#password').val();
  let password_confirmation = $('#password_confirmation').val();
 fetch(`https://sweater-weather-app.herokuapp.com/api/v1/sessions?email=${email}&password=${password}`, {
   method: 'POST'
   // headers: { 'Content-Type': 'application/json'},
 })
 .then(function(u){ return u.json();}
).then((json) => {
  loginData = json;
}).then((json) => {
  confirmLogin();
})
 .catch((error) => console.error({error}));
};

function confirmLogin() {
  if (loginData["data"] != undefined) {
    document.cookie = `api_key=${loginData["data"]["attributes"]["api_key"]}`
    alert('Successfully logged in!')
    return true;
  }
}

function validateForm() {
        x = document.getElementById('email').value;
        y = document.getElementById('password').value;

    if (x === null || x === "") {
        alert("Email must be filled out");
        return false;
    }
    if (y === null || y === "") {
        alert("Password must be filled out");
        return false;
    }
}

function buildNavBar() {
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
          <a href='./login.html' id='logout'>Log Out</a> | <a href='./register.html'>Register</a>
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

$('#login').click(validateForm)
$('#login').click(logIn)

buildNavBar();
