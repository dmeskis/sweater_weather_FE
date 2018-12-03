/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// This file is in the entry point in your webpack config.
	// function buildNavBar() {
	//     var api_key = getCookie("api_key");
	//     if (api_key != "") {
	//       $('nav-bar').append(`
	//         <div class='search-bar'>
	//           <form action="./city.html">
	//             <input type="text" name="location" onfocus="this.value=''" value="City, state...">
	//             <input class='sexy-submit' type="submit" value="Search">
	//           </form>
	//         </div>
	//         <div class='user-options align-right'>
	//           <a href='./login.html' id='logout'>Log Out</a> | <a href='./register.html'>Register</a>
	//         </div>`
	//       )
	//     } else {
	//       $('nav-bar').append(`
	//         <div class='search-bar'>
	//           <form action="./city.html">
	//             <input type="text" name="location" onfocus="this.value=''" value="City, state...">
	//             <input class='sexy-submit' type="submit" value="Search">
	//           </form>
	//         </div>
	//         <div class='user-options align-right'>
	//           <a href='./login.html'>Login</a> | <a href='./register.html'>Register</a>
	//         </div>`
	//       )
	//     }
	// }
	"use strict";

/***/ })
/******/ ]);