"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = exports.throttleLast = exports.throttle = exports.memorize = exports.isFunc = exports.doIt = exports.debounce = exports.checkCall = void 0;

var _number = require("./number");

var _object = require("./object");

var _this = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Check if the passed in method is a function, and calls it
 * @param  { function } method - function to call
 * @param  { object } params - params to pass to the method on call
 * @return { any } - whatever the passed in method returns
 */
var checkCall = function checkCall(method) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return isFunc(method) && method.apply(void 0, params) || undefined;
};
/**
 * Ensures a function is not called to many times
 * @param  { function } func - function to call
 * @param  { number } wait - how long to wait between function calls
 * @param  { boolean } immediate - should call immediately
 * @return { void }
 */


exports.checkCall = checkCall;

var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
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
 * Execute a method n times
 * Callback params - does not include number || callback method
 * Example doIt(10, window, [], (index, arr)=> { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
 * @param  { number } args[0] - number of times to call the callback
 * @param  { parent } args[1] - value to bind the method call to ( this )
 * @param  { function } args[ args.length -1 ] - method to call
 * @return { void }
 */


exports.debounce = debounce;

var doIt = function doIt() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var params = args.slice();
  var num = params.shift();
  var cb = params.pop();
  if (!(0, _number.isNum)(num) || !isFunc(cb)) return;
  var i = -1;

  while (++i < num) {
    if (cb.call.apply(cb, [params[0], i].concat(_toConsumableArray(params))) === false) break;
  }
};
/**
 * Check if the passed in item is a function
 * @param  { any } test 
 * @return { boolean } is a function
 */


exports.doIt = doIt;

var isFunc = function isFunc(func) {
  return typeof func === 'function';
};
/**
 * Creates a method to memorize passed in methods output
 * @param { function } func - method to memorize output of
 * @param { function } getCacheKey - gets the key to save cached output
 * @return { function } memorized function with cache
 */


exports.isFunc = isFunc;

var memorize = function memorize(func, getCacheKey, limit) {
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) throw new TypeError('Expected a function');

  var _memorized = function memorized() {
    var cache = _memorized.cache;
    var key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if ((0, _object.hasOwn)(cache, key)) return cache[key];
    var result = func.apply(this, arguments);
    !(0, _number.isNum)(limit) || Object.key(cache).length < limit ? cache[key] = result : _memorized.cache = _defineProperty({}, key, result);
    return result;
  };

  _memorized.cache = {};

  _memorized.destroy = function () {
    getCacheKey = undefined;
    _memorized.cache = undefined;
    _memorized.destroy = undefined;
    _memorized = (_readOnlyError("memorized"), undefined);
  };

  return _memorized;
};
/**
 * Throttle function calls to only execute once over a wait period
 * usage: throttle(() => console.log('throttled'), 50)()
 * @param  { any } func - method to call after wait
 * @param  { number } [wait=100] time to wait between calls
 * @return { function } throttled function
 */


exports.memorize = memorize;

var throttle = function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var waiting = false;
  return function () {
    if (waiting) return;
    waiting = true;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
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
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
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
/**
 * Creates a uuid, unique up to around 20 million iterations. good enough for us
 * @param  { number } start of the uuid
 * @return { string } - build uuid
 */


exports.throttleLast = throttleLast;

var uuid = function uuid(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};

exports.uuid = uuid;