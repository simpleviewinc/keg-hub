"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleLast = exports.throttle = exports.uuid = exports.checkCall = exports.debounce = exports.isFunc = void 0;

var _this = void 0;

/**
 * Check if the passed in item is a function
 * @param  { any } test 
 * @return { boolean } is a function
 */
var isFunc = function isFunc(func) {
  return typeof func === 'function';
};
/**
 * Ensures a function is not called to many times
 * @param  { function } func - function to call
 * @param  { number } wait - how long to wait between function calls
 * @param  { boolean } immediate - should call immediately
 * @return { void }
 */


exports.isFunc = isFunc;

var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!isFunc(func)) return null;
    var context = _this;

    var later = function later() {
      timeout = null;
      !immediate && func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) return isFunc(func) && func.apply(context, args);
  };
};
/**
 * Check if the passed in method is a function, and calls it
 * @param  { function } method - function to call
 * @param  { object } params - params to pass to the method on call
 * @return { any } - whatever the passed in method returns
 */


exports.debounce = debounce;

var checkCall = function checkCall(method) {
  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  return isFunc(method) && method.apply(void 0, params) || undefined;
};
/**
 * Creates a uuid, unique up to around 20 million iterations. good enough for us
 * @param  { number } start of the uuid
 * @return { string } - build uuid
 */


exports.checkCall = checkCall;

var uuid = function uuid(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};
/**
 * Throttle function calls to only execute once over a wait period
 * usage: throttle(() => console.log('throttled'), 50)()
 * @param  { any } func - method to call after wait
 * @param  { number } [wait=100] time to wait between calls
 * @return { function } throttled function
 */


exports.uuid = uuid;

var throttle = function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var waiting = false;
  return function () {
    if (waiting) return;
    waiting = true;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    func.apply(_this, args);
    return setTimeout(function () {
      waiting = false;
    }, wait);
  };
};
/**
 * Ensures the last call to the throttled function get called
 * Will wait the allotted time, before calling the last call to it
 * The final call will not execute until no more calls are made
 * Accepts a callback to call each time the throttle called
 * @param  { function } func - method to call after wait
 * @param  { function } cb - method to call after throttle function is called
 * @param  { number } [wait=100] time to wait until executing func param
 * @return { function } throttled function
 */


exports.throttle = throttle;

var throttleLast = function throttleLast(func, cb) {
  var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var throttleTimeout;
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    // If the throttle already exists clear it, and create it again
    if (throttleTimeout) clearTimeout(throttleTimeout); // Store a reference to the timeout
    // Will wait the allotted time until calling the final call to it

    throttleTimeout = setTimeout(function () {
      func.apply(_this, args);
      clearTimeout(throttleTimeout);
    }, wait);
    typeof cb === 'function' && cb();
  };
};

exports.throttleLast = throttleLast;