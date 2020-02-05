/** @module promise */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.promisifyAll = exports.promisify = void 0;

var _object = require("./object");

var _method = require("./method");

var promisify = function promisify(method) {
  if (!(0, _method.isFunc)(method)) throw "Argument must be a function";
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (res, rej) {
      // If the last arg is not a function, just return the resolved method
      if (!(0, _method.isFunc)(args[args.length - 1])) return res(method.apply(void 0, args)); // Remove the callback method

      args.pop(); // Replace it with the promise resolve / reject

      args.push(function () {
        for (var _len2 = arguments.length, cbData = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          cbData[_key2] = arguments[_key2];
        }

        // If the cbData first arg is not falsy, then reject the promise
        // Otherwise resolve it
        return cbData && cbData[0] ? rej.apply(void 0, cbData) : res.apply(void 0, cbData);
      }); // Call the method, and return it

      return method.apply(void 0, args);
    });
  };
};

exports.promisify = promisify;
var isTest = process.env.NODE_ENV === 'test';
/**
 * Creates an array of Object default properties not to convert into promises
 */

var defObjProps = Array.from(['caller', 'callee', 'arguments', 'apply', 'bind', 'call', 'toString', '__proto__', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', 'toLocaleString']).concat(Object.getOwnPropertyNames(Object.prototype)).reduce(function (map, functionName) {
  map[functionName] = true;
  return map;
}, {});
/**
 * Loops an object and looks for any methods that belong to the object, then add an Async version
 * @memberof promise
 * @param {Object} object
 * @return {Object} - object with Async methods added
 */

var addAsync = function addAsync(object) {
  if (!object.__IS_PROMISIFIED__) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var prop = _step.value;
        var isAsync = prop.indexOf('Async') !== -1 || object["".concat(prop, "Async")];
        if (isAsync || defObjProps[prop]) continue;
        if ((0, _method.isFunc)(object[prop])) object["".concat(prop, "Async")] = promisify(object[prop]);else {
          var getValue = Object.getOwnPropertyDescriptor(object, prop).get;
          if ((0, _method.isFunc)(getValue)) object["".concat(prop, "Async")] = promisify(getValue);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    object.__IS_PROMISIFIED__ = true;
  }

  return object;
};
/**
 * Converts Objects method properties into promiseAsync. allow using promisifyAll
 * @function
 * @param {Object} object
 * @return {Object} - promisified object
 */


var promisifyAll = function promisifyAll(object) {
  if (!(0, _object.isObj)(object)) return object;
  addAsync(object);
  var proto = Object.getPrototypeOf(object);
  proto && Object.getPrototypeOf(proto) !== null && addAsync(proto);
  return object;
};
/**
 * Stops execution for a given amount of time
 * @function
 * @param {number} time - Amount of time to wait
 * @return { void }
 */


exports.promisifyAll = promisifyAll;

var wait = function wait(time) {
  return new Promise(function (res, rej) {
    return setTimeout(function () {
      return res(true);
    }, time);
  });
};

exports.wait = wait;