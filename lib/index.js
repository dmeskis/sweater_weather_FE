// This file is in the entry point in your webpack config.
function buildNavBar() {
    var api_key = getCookie("api_key");
    if (api_key != "") {
      $('nav-bar').append(`
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
      $('nav-bar').append(`
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
