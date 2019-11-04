/** @module command */
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('../log'),
    logData = _require.logData,
    setLogs = _require.setLogs;

var _require2 = require('../promise'),
    promisify = _require2.promisify,
    wait = _require2.wait;

var _require3 = require('child_process'),
    exec = _require3.exec;

var cmdExec = promisify(exec);

var fs = require('fs');

var _process$env = process.env,
    SHOW_LOGS = _process$env.SHOW_LOGS,
    NODE_ENV = _process$env.NODE_ENV;
var cmdOpts = {
  groupID: process.getgid(),
  userID: process.getuid(),
  maxBuffer: Infinity
};
SHOW_LOGS && setLogs(true);
var ERROR_PREFIX = 'ERROR';
/**
* Logs a message to the console
* @function
* @param {any} message - message to log
* @param {Object} error - thrown during service account process
* @param {string} [type='error'] - type of message to log
* @return { void }
*/

var errorHelper = function errorHelper(message, error) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'error';
  setLogs(true);
  logData(message, error, type);
  if (!SHOW_LOGS) setLogs(false);
};
/**
* Logs a message to the console
* @function
* @param {string} message - message to be logged
* @param {string} type - method that shoudl be called  ( log || error || warn )
* @return { void }
*/


var logMessage = function logMessage(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
  var force = arguments.length > 2 ? arguments[2] : undefined;
  if (force) setLogs(true);
  logData(message, type);
  if (force && !SHOW_LOGS) setLogs(false);
};
/**
 * Gets arguments from the cmd line
 * @function
 *
 * @return {Object} - converted CMD Line arguments as key / value pair
 */


var getArgs = function getArgs() {
  return process.argv.slice(2).reduce(function (args, arg) {
    if (arg.indexOf('-') !== 0) throw new Error("Invalid Argument: ".concat(arg, " is missing \"-\". Argument key should be \"-").concat(arg, "\""));
    arg = arg.split('-').filter(function (it) {
      return it;
    }).join('-');
    if (arg.indexOf('=') === -1) args[arg] = true;else {
      var parts = arg.split('=');
      var name = parts[0];
      var val = parts[1];
      args[name] = val.indexOf(',') === -1 ? val : val.split(',');
    }
    return args;
  }, {});
};
/**
* Ensures all required arguments exist based on passed in error object
* @function
* @param {Object} args - passed in arguments
* @param {Object} errors - error message for required arguments
* @return { void }
*/


var validateArgs = function validateArgs(args, errors) {
  return Object.keys(errors).map(function (key) {
    if (!args[key]) {
      if (_typeof(errors[key]) === 'object') {
        if (errors[key].condition && args[errors[key].condition]) return;
        if (errors[key].message) throw Error(errors[key].message);
      }

      throw Error(errors[key]);
    }
  });
};
/**
* Makes calls to the cmd line shell
* @function
* @param {string} line - command to be run in the shell
* @return response from the shell
*/


var cmd =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(line) {
    var response, stdout, stderr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            SHOW_LOGS && logData("CMD => ".concat(line), 'log');
            _context.next = 3;
            return cmdExec(line, cmdOpts);

          case 3:
            response = _context.sent;
            stdout = response.stdout, stderr = response.stderr;

            if (!(stderr && stderr.indexOf(ERROR_PREFIX) === 0)) {
              _context.next = 7;
              break;
            }

            throw new Error(stderr);

          case 7:
            return _context.abrupt("return", stdout);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function cmd(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
* Copies file from one location to another
* @function
* @param {string} file - file to be copied
* @param {string} loc - location to put the copied file
* @return { void }
*/


var copyFile =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(file, loc) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cmd("cp ".concat(file, " ").concat(loc));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function copyFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
* Ensures a folder path exists, if it does not, then it creates it
* @function
* @param {string} checkPath - path to check
* @return {boolean} - if the path exists
*/


var ensureFolderPath =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(checkPath) {
    var pathExists;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            // Check if the path exists, if not, then create it
            pathExists = fs.existsSync(checkPath);
            _context3.t0 = !pathExists;

            if (!_context3.t0) {
              _context3.next = 6;
              break;
            }

            _context3.next = 6;
            return cmd("mkdir -p ".concat(checkPath));

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t1 = _context3["catch"](0);
            return _context3.abrupt("return", true);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function ensureFolderPath(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
* Writes a file to the local system
* @function
* @param {string} path - location to save the file
* @param {string} data - data to save in the file
* @return { promise || boolean } - if the file was saved
*/


var writeFile = function writeFile(filePath, data) {
  return new Promise(function (req, rej) {
    return fs.writeFile(filePath, data, function (err) {
      return err ? rej(err) : req(true);
    });
  });
};

module.exports = {
  cmd: cmd,
  copyFile: copyFile,
  ensureFolderPath: ensureFolderPath,
  errorHelper: errorHelper,
  getArgs: getArgs,
  logMessage: logMessage,
  writeFile: writeFile,
  validateArgs: validateArgs
};