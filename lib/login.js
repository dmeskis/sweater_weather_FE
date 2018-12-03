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

$('#login').click(validateForm)
$('#login').click(logIn)
