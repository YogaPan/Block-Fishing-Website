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
/***/ function(module, exports, __webpack_require__) {

	let blocklist = __webpack_require__(1);

	console.log('block fishing website extension run background.');

	// TODO
	function inBlockList(blocklist, url) {
	  for (let i = 0; i < blocklist.length; i++) {
	    if (url === blocklist[i]) {
	      return true
	    }
	  }

	  return false;
	}

	function block(tab) {
	  console.log(`block ${tab.url}!`);

	  chrome.tabs.update(tab.id, {
	    url: '/stop.html',
	  });
	}

	function foo(tab) {
	  if (inBlockList(tab)) {
	    block();
	  }
	}

	// When new tab open.
	chrome.tabs.onCreated.addListener((tab) => {
	  foo(tab);
	});

	// When load new url.
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	  foo(tab);
	});

	function getCurrentTabUrl(callback) {
	  var queryInfo = {
	    active: true,
	    currentWindow: true
	  };

	  chrome.tabs.query(queryInfo, function(tabs) {
	    var tab = tabs[0];
	    var url = tab.url;

	    console.assert(typeof url == 'string', 'tab.url should be a string');

	    callback(url);
	  });
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = [
		"https://www.facebook.com/*",
		"https://www.youtube.com/*"
	];

/***/ }
/******/ ]);