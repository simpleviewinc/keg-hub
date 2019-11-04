"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

require("regenerator-runtime/runtime");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../array'),
    isArr = _require.isArr;

var Method = require('../method');

var promiseHelper = function promiseHelper(isValid) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      isValid ? res("Promise Valid") : rej(new Error("Promise Error"));
    }, 100);
  });
};

var promiseError = function promiseError(isValid) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      throw new Error("Promise Error");
    }, 100);
  });
};

describe('/method', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('checkCall', function () {
    it('should check if a method, and call it with passed in params', function () {
      var testMethod = jest.fn(function () {});
      Method.checkCall(testMethod, 1, 2, 3);
      expect(testMethod).toHaveBeenCalledWith(1, 2, 3);
    });
    it('should not try to call a method if its not a function', function () {
      expect(Method.checkCall(null, 1, 2, 3)).toEqual(undefined);
    });
  });
  describe('debounce', function () {
    it('should call the passed method after the correct amount of time', function (done) {
      var testMethod = jest.fn(function () {});
      var boundMethod = Method.debounce(testMethod, 100);
      boundMethod();
      setTimeout(function () {
        expect(testMethod).not.toHaveBeenCalled();
      }, 99);
      setTimeout(function () {
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 101);
    });
    it('should use 250 as default wait time when not wait time is passed', function (done) {
      var testMethod = jest.fn(function () {});
      var boundMethod = Method.debounce(testMethod);
      boundMethod();
      setTimeout(function () {
        expect(testMethod).not.toHaveBeenCalled();
      }, 50);
      setTimeout(function () {
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 251);
    });
    it('should call immediately is passed in as true', function (done) {
      var testMethod = jest.fn(function () {});
      var boundMethod = Method.debounce(testMethod, 300);
      boundMethod();
      var nowMethod = Method.debounce(testMethod, 300, true);
      setTimeout(function () {
        expect(testMethod).not.toHaveBeenCalled();
        nowMethod();
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 50);
    });
    it('should not try to call the fun if a fun is not passed in', function () {
      var testMethod = jest.fn(function () {});
      var boundMethod = Method.debounce(undefined);
      expect(boundMethod()).toEqual(null);
    });
  });
  describe('doIt', function () {
    it('should execute the callback n times based on passed in param', function () {
      var callback = jest.fn(function (index, arr, data) {
        return arr.push(index);
      });
      Method.doIt(5, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(5);
    });
    it('should stop call the callback when the last callback returned false', function () {
      var isBound;
      var callback = jest.fn(function (index, arr, data) {
        return false;
      });
      Method.doIt(3, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
    it('should keep calling the callback when the callback returns falsy but not false', function () {
      var isBound;
      var callback = jest.fn(function (index, arr, data) {
        return undefined;
      });
      Method.doIt(3, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(3);
    });
    it('should return an array of response from the return of the callback', function () {
      var isBound;
      var callback = jest.fn(function (index, arr, data) {
        return Math.floor(Math.random() * 10);
      });
      var responses = Method.doIt(3, global, [], callback);
      expect(isArr(responses)).toBe(true);
      expect(responses.length).toBe(3);
    });
    it('should bind the callback to the second argument', function () {
      var isBound;
      var callback = jest.fn(function (index, arr, data) {
        isBound = this === global;
      });
      Method.doIt(1, global, [], callback);
      expect(isBound).toBe(true);
    });
    it('should pass all arguments to the callback after first 2, and exclude the last', function () {
      var has1;
      var has2;
      var has3;
      var callback = jest.fn(function (index, is1, is2, is3) {
        has1 = is1;
        has2 = is2;
        has3 = is3;
      });
      Method.doIt(1, global, 1, 2, 3, callback);
      expect(has1).toBe(1);
      expect(has2).toBe(2);
      expect(has3).toBe(3);
    });
  });
  describe('isFunc', function () {
    it('should return true when passed in parm is a function', function () {
      expect(Method.isFunc(jest.fn())).toEqual(true);
    });
    it('should return false when passed in parm is not a function', function () {
      expect(Method.isFunc(null)).toEqual(false);
    });
  });
  describe('memorize', function () {
    it('should return a function', function () {});
    it('should return the last response to a method when params are the same', function () {});
    it('should set the response to the memorize cache', function () {});
    it('should clear the cache when memorize.destroy is called', function () {});
  });
  describe('throttle', function () {
    it('should only call the passed in method once over a given amount of time', function () {});
  });
  describe('throttleLast', function () {
    it('should only call the last method passed to it', function () {});
  });
  describe('limbo', function () {
    it('should return an array with the length of 2',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(done) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Method.limbo(promiseHelper(true));

              case 2:
                response = _context.sent;
                expect(_typeof(response)).toBe('object');
                expect(isArr(response)).toBe(true);
                expect(response.length).toBe(2);
                done();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when the promise is rejected',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(done) {
        var _ref3, _ref4, err, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Method.limbo(promiseHelper(false));

              case 2:
                _ref3 = _context2.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                err = _ref4[0];
                data = _ref4[1];
                expect(err instanceof Error).toBe(true);
                expect(err.message).toEqual("Promise Error");
                done();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    it('should return null for first slot when an error is not throw',
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(done) {
        var _ref6, _ref7, err, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Method.limbo(promiseHelper(true));

              case 2:
                _ref6 = _context3.sent;
                _ref7 = _slicedToArray(_ref6, 2);
                err = _ref7[0];
                data = _ref7[1];
                expect(err).toBe(null);
                done();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    it('should return promise response for second slot when error is not throw',
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(done) {
        var _ref9, _ref10, err, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Method.limbo(promiseHelper(true));

              case 2:
                _ref9 = _context4.sent;
                _ref10 = _slicedToArray(_ref9, 2);
                err = _ref10[0];
                data = _ref10[1];
                expect(data).toEqual("Promise Valid");
                done();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when no promise is passed in',
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(done) {
        var _ref12, _ref13, err, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Method.limbo();

              case 2:
                _ref12 = _context5.sent;
                _ref13 = _slicedToArray(_ref12, 2);
                err = _ref13[0];
                data = _ref13[1];
                expect(err instanceof Error).toBe(true);
                done();

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref11.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when an error is thrown',
    /*#__PURE__*/
    function () {
      var _ref14 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(done) {
        var _ref15, _ref16, err, data;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Method.limbo();

              case 2:
                _ref15 = _context6.sent;
                _ref16 = _slicedToArray(_ref15, 2);
                err = _ref16[0];
                data = _ref16[1];
                expect(err instanceof Error).toBe(true);
                done();

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x6) {
        return _ref14.apply(this, arguments);
      };
    }());
  });
  describe('uuid', function () {
    it('should return a valid uuid', function () {
      var uuid = Method.uuid();
      if (!uuid || typeof uuid !== 'string') return false;
      var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
      var isValid = regex.test(uuid);
      expect(_typeof(uuid)).toEqual('string');
      expect(isValid).toEqual(true);
    });
    it('should not return uuids that are the same', function () {
      var uuid = Method.uuid();
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(uuid).not.toEqual(Method.uuid());
      expect(Method.uuid()).not.toEqual(Method.uuid());
    });
  });
  describe('pipeline', function () {
    var square = function square(x) {
      return x * x;
    };

    var subtractBy = function subtractBy(x, y) {
      return x - y;
    };

    var startingValue = 2;
    it('should return the value run through the pipeline', function () {
      var result = Method.pipeline(startingValue, function (num) {
        return num + 1;
      }, square);
      expect(result).toEqual(9);
    });
    it('should work with array expressions', function () {
      var result = Method.pipeline(2, square, [subtractBy, 5] // take the square of 2 and subtract 5 from it
      );
      expect(result).toEqual(-1);
    });
    it('should NOT call its first argument, if it is a function', function () {
      var result = Method.pipeline(function () {
        return 2;
      }, function (x) {
        return x() * 10;
      });
      expect(result).toEqual(20);
    });
    it('should return the element if no functions are specified', function () {
      var element = "foo";
      var result = Method.pipeline(element);
      expect(result).toEqual(element);
    });
    it('should log errors if it encountered an invalid expression', function () {
      var orgError = console.error;
      console.error = jest.fn();
      expect(Method.pipeline(1, square, "invalid expression")).toEqual(1);
      expect(console.error).toHaveBeenCalled();
      console.error = orgError;
    });
  });
});