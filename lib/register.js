let registrationData

const registerAccount = (event) => {
  event.preventDefault();
  let email = $('#email').val();
  let password = $('#password').val();
  let password_confirmation = $('#password_confirmation').val();
 fetch(`https://sweater-weather-app.herokuapp.com/api/v1/users?email=${email}&password=${password}&password_confirmation=${password_confirmation}`, {
   method: 'POST'
   // headers: { 'Content-Type': 'application/json'},
 })
 .then(function(u){ return u.json();}
).then((json) => {
  registrationData = json;
}).then((json) => {
  confirmAccountCreation();
})
 .catch((error) => console.error({error}));
};

function confirmAccountCreation() {
  if (registrationData["data"] != undefined) {
    alert('Succesfully created account!');
    return true;
  }
}

function validateForm() {
        x = document.getElementById('email').value;
        y = document.getElementById('password').value;
        z = document.getElementById('password_confirmation').value;

    if (x === null || x === "") {
        alert("Email must be filled out");
        return false;
    }
    if (y === null || y === "") {
        alert("Password must be filled out");
        return false;
    }
    if (z === null || z === "" || y != z) {
        alert("Password confirmation must match password");
        return false;
    }
}

$('#register').click(validateForm)
$('#register').click(registerAccount)
