

$('#register').click(validateForm)

function validateForm() {
        x = document.getElementById('uname').value;
        y = document.getElementById('password').value;
        z = document.getElementById('password_confirmation').value;

    if (x === null || x === "") {
        alert("Username must be filled out");
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
