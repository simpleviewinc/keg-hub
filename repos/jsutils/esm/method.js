/** @module functions */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = exports.cloneFunc = exports.uuid = exports.limbo = exports.throttleLast = exports.throttle = exports.memorize = exports.isFunc = exports.doIt = exports.debounce = exports.eitherFunc = exports.checkCall = exports.applyToFunc = exports.pipeline = void 0;

var _array = require("./array");

var _number = require("./number");

var _object = require("./object");

var _ext = require("./ext");

var _this = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pipeline = function pipeline(item) {
  for (var _len = arguments.length, functions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    functions[_key - 1] = arguments[_key];
  }

  return functions.reduce(function (result, fn) {
    return applyToFunc(result, fn);
  }, item);
};
/**
 * Helper for pipeline. Passes 'item' into 'expression' as its first argument.
 * <br> Expression may be a function or an array of form: [function, ...remainingArguments].
 * @function
 * @param {*} item 
 * @param {*} expression 
 */


exports.pipeline = pipeline;

var applyToFunc = function applyToFunc(item, expression) {
  if ((0, _array.isArr)(expression)) {
    var _expression = _toArray(expression),
        func = _expression[0],
        args = _expression.slice(1);

    return func.apply(void 0, [item].concat(_toConsumableArray(args)));
  } else if (isFunc(expression)) {
    return expression(item);
  } else {
    console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(_typeof(expression)));
    return item;
  }
};
/**
 * Check if the passed in method is a function, and calls it
 * @example
 * checkCall((param1) => { return param1 }, 'foo')
 * // Returns 'foo'
 * @function
 * @param {function} method - function to call
 * @param {Object} params - params to pass to the method on call
 * @return {*} - whatever the passed in method returns
 */


exports.applyToFunc = applyToFunc;

var checkCall = function checkCall(method) {
  for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    params[_key2 - 1] = arguments[_key2];
  }

  return isFunc(method) && method.apply(void 0, params) || undefined;
};
/**
 * Returns the first param if it's a function.
 * <br> If first param is not a function, returns second param.
 * @example
 * eitherFunc(() => {}, 'bar')
 * // Returns first param because it's a function.
 * @example
 * eitherFunc('foo', 'bar')
 * // Returns 'bar'
 * @function
 * @param {function} func1 - return if is func
 * @param {function} func2 - use if first is not an object
 * @returns {function}
 */


exports.checkCall = checkCall;

var eitherFunc = function eitherFunc(func1, func2) {
  return isFunc(func1) && func1 || func2;
};
/**
 * Limits the amount of calls to a function over time
 * @example
 * debounce(myFunction)
 * // Calls myFunction after the default 250 ms
 * @example
 * debounce(myFunction, 500)
 * // Calls myFunction after 500 ms
 * @example
 * debounce(myFunction, 500, true)
 * // Calls myFunction immediately
 * @function
 * @param {function} func - function to call
 * @param {number} wait - how long to wait between function calls
 * @param {boolean} immediate - should call immediately
 * @return { void }
 */


exports.eitherFunc = eitherFunc;

var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
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
 * Execute a method n times.
 * <br> Callback params - does not include number || callback method
 * @function
  * @example
 * doIt(10, window, [], (index, arr) => { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
 * @param {number} args.0 - number of times to call the callback
 * @param {parent} args.1 - value to bind the method call to ( this )
 * @param {function} last arg of args array - method to call
 * @return { void }
 */


exports.debounce = debounce;

var doIt = function doIt() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  var params = args.slice();
  var num = params.shift();
  var bindTo = params.shift();
  var cb = params.pop();
  if (!(0, _number.isNum)(num) || !isFunc(cb)) return [];
  var doItAmount = new Array(num);
  var responses = [];

  for (var i = 0; i < doItAmount.length; i++) {
    var data = cb.call.apply(cb, [bindTo, i].concat(_toConsumableArray(params)));
    if (data === false) break;
    responses.push(data);
  }

  return responses;
};
/**
 * Check if the passed in item is a function.
 * @example
 * isFunc(() => {})
 * // Returns true
 * @example
 * isFunc('bar')
 * // Returns false
 * @function
 * @param {*} test
 * @return {boolean} is a function
 */


exports.doIt = doIt;

var isFunc = function isFunc(func) {
  return typeof func === 'function';
};
/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
  * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {function} func - method to memorize output of
 * @param {function} getCacheKey - gets the key to save cached output
 *
 * @return {function} memorized function with cache
 */


exports.isFunc = isFunc;

var memorize = function memorize(func, getCacheKey) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);

  var _memorized = function memorized() {
    var cache = _memorized.cache;
    var key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if ((0, _object.hasOwn)(cache, key)) return cache[key];
    var result = func.apply(this, arguments);
    (0, _number.isNum)(limit) && Object.keys(cache).length < limit ? cache[key] = result : _memorized.cache = _defineProperty({}, key, result);
    return result;
  };

  _memorized.cache = {};

  _memorized.destroy = function () {
    getCacheKey = undefined;
    _memorized.cache = undefined;
    _memorized.destroy = undefined;
    _memorized = undefined;
  };

  return _memorized;
};
/**
 * Throttle function calls to only execute once over a wait period
 * @example
 * throttle(() => console.log('throttled'), 50)()
 * @function
 * @param {*} func - method to call after wait
 * @param {number} [wait=100] time to wait between calls
 * @return {function} throttled function
 */


exports.memorize = memorize;

var throttle = function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var waiting = false;
  return function () {
    if (waiting) return;
    waiting = true;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    func.apply(_this, args);
    return setTimeout(function () {
      waiting = false;
    }, wait);
  };
};
/**
 * Ensures the last call to the throttled function get called.
 * <br> Will wait the allotted time, before calling the last call to it.
 * <br> The final call will not execute until no more calls are made,
 * <br> Accepts a callback to call each time the throttle called,
 * @example
 * throttleLast(() => {}, () => {})()
 * // throttle function
 * @function
 * @param {function} func - method to call after wait
 * @param {function} cb - method to call after throttle function is called
 * @param {number} [wait=100] time to wait until executing func param
 * @return {function} throttled function
 */


exports.throttle = throttle;

var throttleLast = function throttleLast(func, cb) {
  var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var throttleTimeout;
  return function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
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
 * Adds catch to a promise for better error handling of await functions
 * <br> Removes the need for wrapping await in a try / catch
 * @example
 * const [ err, data ] = await limbo(promiseFunction())
 * // returns an array
 * // * err will be undefined if no error was thrown
 * // * data will be the response from the promiseFunction
 * @function
 * @param {Promise} promise - Promise to be resolved
 * @return {Array} - Slot 1 => error, Slot 2 => response from promise
 */


exports.throttleLast = throttleLast;

var limbo = function limbo(promise) {
  return !promise || !isFunc(promise.then) ? [new Error("A promise or thenable is required as the first argument!"), null] : promise.then(function (data) {
    return [null, data];
  })["catch"](function (err) {
    return [err, undefined];
  });
};
/**
 * Creates a uuid, unique up to around 20 million iterations.
 * @example
 * uuid()
 * // New uuid as a string
 * @function
 * @param {number} start of the uuid
 * @return {string} - build uuid
 */


exports.limbo = limbo;

var uuid = function uuid(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};
/**
 * Clones a function using the Function constructor and calling toString on the passed in function
 * @example
 * const func = () => { console.log('test') }
 * const clone = cloneFunc(func)
 * // clone !== func
 * @function
 * @param {function} func - function to clone
 *
 * @returns {Object} cloned function
 */


exports.uuid = uuid;

var cloneFunc = function cloneFunc(func) {
  var funcRef = func;

  var funcWrap = function funcWrap() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return _construct(funcRef, args);
  };

  var funcClone = function funcClone() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return func instanceof funcClone ? funcWrap.apply(null, args) : funcRef.apply(func, args);
  };

  for (var key in func) {
    func.hasOwnProperty(key) && (funcClone[key] = func[key]);
  }

  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true
  });

  funcClone.toString = function () {
    return func.toString();
  };

  return funcClone;
};
/**
* Pattern matching function. Iterates through the entries,
* which have the form [ check value or predicate, return value ], and
* when it encounters an entry whose check value matches the matchArg
* (or the predicate returns true when passed the matchArg), it returns
* the return value of that entry.
*
* For the default case: use [ match.default, <your default value> ]
* @function
*
* @param {*} matchArg - the argument to match against the cases
* @param {Array} entries - the cases
* @returns the return value of the first entry with a matching check value, else null
*
* @example 
* const value = 1
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
*  [ match.default, "defaulted"]
* ) 
* => returns "hello"
* 
* @example 
* const value = 3
* match(value,
*  [ 1, "hello" ],
*  [ x => x > 2, "greater" ] 
* ) 
* => returns "greater"
*
* @example 
* // react reducer:
*function todoReducer(state, action) {
*   const reducer = match(action.type,
*       [ 'ADD-TODO', addTodo ],
*       [ 'REMOVE-TODO', removeTodo ],
*       [ 'UPDATE-TODO', updateTodo ],
*       [ match.default, state ]
*   )
*
*   return reducer(state, action)
*}
*/


exports.cloneFunc = cloneFunc;

var match = function match(matchArg) {
  for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
    args[_key9 - 1] = arguments[_key9];
  }

  if (!args.length) return null; // check all cases and return a value if a match is found

  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var entry = _args[_i];

    if (!(0, _array.isArr)(entry)) {
      console.error("Matching case must be an entry (a 2-element array). Found: ".concat((0, _ext.typeOf)(entry)), entry);
      break;
    }

    var _entry = _slicedToArray(entry, 2),
        caseValueOrPredicate = _entry[0],
        valueOnMatch = _entry[1];

    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
    if (caseValueOrPredicate === matchArg) return valueOnMatch;
  }

  return null;
};
/**
 * The default case function you can use with match. Just returns true so the case value can be used.
 * @function
 * @example
 * match(foo
 *    [ 100, 'a' ],
 *    [ 200, 'b' ],
 *    [ match.default, 'default value' ]
 * )
 */


exports.match = match;

match["default"] = function () {
  return true;
};