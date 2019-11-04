/** @module command */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require('path');

var _require = require('../array'),
    isArr = _require.isArr;

var _require2 = require('../method'),
    isFunc = _require2.isFunc;

var _require3 = require('../object'),
    isObj = _require3.isObj;

var _require4 = require('../string'),
    isStr = _require4.isStr;

var getRelativePath = function getRelativePath(pathToModule) {
  var filename = module.parent.filename;
  var split = filename.split('/');
  split.pop();
  return path.resolve(split.join('/'), pathToModule);
};
/**
 * Use nodes require method to load a module by file path.
 * <br> Use the rootDir to load the module if it's passed in
 * <br> If rootDir + pathToModule fails, will try to load the module without the rootDir
 * @param {Path|string} pathToModule - Path to the module to load
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @returns {Object|function} - Loaded module
 */


var requireModule = function requireModule(pathToModule, config) {
  var rootDir = config.rootDir,
      logErrors = config.logErrors;

  try {
    // Check if a rootDir exists
    return rootDir // If rootDir exists, use it to load the module
    ? require(path.join(rootDir, pathToModule)) // If no rootDir, try to load the module without it
    : require(getRelativePath(pathToModule));
  } catch (err) {
    // Show errors if set to true
    logErrors && logData(err.message, "error"); // If there's and error, call requireModule again, without the rootDir

    return rootDir ? requireModule(pathToModule, null) : undefined;
  }
};
/**
 * Checks if the module is a function and calls it
 * <br> Or if it's an object return it
 * @param {*} foundModule - module loaded from require
 * @param {*} params - arguments to pass to the module if it's a function
 * @returns
 */


var loadByType = function loadByType(foundModule, params) {
  // Check the type of the foundModule
  return isFunc(foundModule) // If it's a function call it with params
  ? foundModule.apply(void 0, _toConsumableArray(params)) // If it's an object just return it
  : isObj(foundModule) || isArr(foundModule) ? foundModule // If it's not a function or object, return undefined
  : undefined;
};
/**
 * Loops through the pathsToModule array trying to require them 
 *
 * @param {Array} pathsToModule - Potential paths to a module
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @param {Array} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */


var loopLoad = function loopLoad(pathsToModule, config, params) {
  try {
    var modulePath = pathsToModule.shift();
    var foundModule = requireModule(modulePath, config);
    var loadedModule = foundModule && loadByType(foundModule, params);
    if (!loadedModule) throw new Error("No Module!");
    return loadedModule;
  } catch (err) {
    if (!isArr(pathsToModule) || !pathsToModule.length) return undefined;
    return loopLoad(pathsToModule, config, params);
  }
};
/**
 * Use nodes require method to load a module by file path.
 * <br> If the path does not exist check the altPaths to see if any of those paths exist
 * <br> If it's a function call it and pass in the params array
 * <br> Module path is relative to the caller, NOT this function file location!
 * @function
 * @example
 * const packageConfig = loadModule('../package.json')
 * @example
 * const packageConfig = loadModule([ './package.json', '../package.json', '../../package.json', ])
 * @example
 * const packageConfig = loadModule([ './package.json' ], { rootDir: 'path to root directory' })
 * @example
 * const packageConfig = loadModule([ './functionModule' ], {}, param1, param2, param2)
 * // Module will be called if it's a function, and param1, param2, param2 will be passed in
 * @param {Array|string} pathsToModule - Potential paths to a module
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @param {Array} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */


var loadModule = function loadModule(pathsToModule) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Check If a string is passed in
  pathsToModule = isStr(pathsToModule) // If it's a string, convert to an array
  ? [pathsToModule] // Otherwise check if it's and array
  : isArr(pathsToModule) && pathsToModule; // Check if there are paths to load

  for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return pathsToModule // Call loopLoad to load the module
  ? loopLoad(pathsToModule, config, params) // If not paths, log an error
  : lodData("loadModule requires an array or string as the first argument.", "error");
};

module.exports = loadModule;