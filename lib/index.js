// This file is in the entry point in your webpack config.
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

buildNavBar();
