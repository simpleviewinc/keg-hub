"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const _require = require('../array'),
      isArr = _require.isArr;

const Method = require('../method');

const promiseHelper = isValid => new Promise((res, rej) => {
  setTimeout(() => {
    isValid ? res(`Promise Valid`) : rej(new Error(`Promise Error`));
  }, 100);
});

const promiseError = isValid => new Promise((res, rej) => {
  setTimeout(() => {
    throw new Error(`Promise Error`);
  }, 100);
});

describe('/method', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('checkCall', () => {
    it('should check if a method, and call it with passed in params', () => {
      const testMethod = jest.fn(() => {});
      Method.checkCall(testMethod, 1, 2, 3);
      expect(testMethod).toHaveBeenCalledWith(1, 2, 3);
    });
    it('should not try to call a method if its not a function', () => {
      expect(Method.checkCall(null, 1, 2, 3)).toEqual(undefined);
    });
  });
  describe('debounce', () => {
    it('should call the passed method after the correct amount of time', done => {
      const testMethod = jest.fn(() => {});
      const boundMethod = Method.debounce(testMethod, 100);
      boundMethod();
      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled();
      }, 99);
      setTimeout(() => {
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 101);
    });
    it('should use 250 as default wait time when not wait time is passed', done => {
      const testMethod = jest.fn(() => {});
      const boundMethod = Method.debounce(testMethod);
      boundMethod();
      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled();
      }, 50);
      setTimeout(() => {
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 251);
    });
    it('should call immediately is passed in as true', done => {
      const testMethod = jest.fn(() => {});
      const boundMethod = Method.debounce(testMethod, 300);
      boundMethod();
      const nowMethod = Method.debounce(testMethod, 300, true);
      setTimeout(() => {
        expect(testMethod).not.toHaveBeenCalled();
        nowMethod();
        expect(testMethod).toHaveBeenCalled();
        done();
      }, 50);
    });
    it('should not try to call the fun if a fun is not passed in', () => {
      const testMethod = jest.fn(() => {});
      const boundMethod = Method.debounce(undefined);
      expect(boundMethod()).toEqual(null);
    });
  });
  describe('doIt', () => {
    it('should execute the callback n times based on passed in param', () => {
      const callback = jest.fn((index, arr, data) => arr.push(index));
      Method.doIt(5, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(5);
    });
    it('should stop call the callback when the last callback returned false', () => {
      let isBound;
      const callback = jest.fn((index, arr, data) => {
        return false;
      });
      Method.doIt(3, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
    it('should keep calling the callback when the callback returns falsy but not false', () => {
      let isBound;
      const callback = jest.fn((index, arr, data) => {
        return undefined;
      });
      Method.doIt(3, global, [], callback);
      expect(callback).toHaveBeenCalledTimes(3);
    });
    it('should return an array of response from the return of the callback', () => {
      let isBound;
      const callback = jest.fn((index, arr, data) => {
        return Math.floor(Math.random() * 10);
      });
      const responses = Method.doIt(3, global, [], callback);
      expect(isArr(responses)).toBe(true);
      expect(responses.length).toBe(3);
    });
    it('should bind the callback to the second argument', () => {
      let isBound;
      const callback = jest.fn(function (index, arr, data) {
        isBound = this === global;
      });
      Method.doIt(1, global, [], callback);
      expect(isBound).toBe(true);
    });
    it('should pass all arguments to the callback after first 2, and exclude the last', () => {
      let has1;
      let has2;
      let has3;
      const callback = jest.fn((index, is1, is2, is3) => {
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
  describe('isFunc', () => {
    it('should return true when passed in parm is a function', () => {
      expect(Method.isFunc(jest.fn())).toEqual(true);
    });
    it('should return false when passed in parm is not a function', () => {
      expect(Method.isFunc(null)).toEqual(false);
    });
  });
  describe('memorize', () => {
    it('should return a function', () => {});
    it('should return the last response to a method when params are the same', () => {});
    it('should set the response to the memorize cache', () => {});
    it('should clear the cache when memorize.destroy is called', () => {});
  });
  describe('throttle', () => {
    it('should only call the passed in method once over a given amount of time', () => {});
  });
  describe('throttleLast', () => {
    it('should only call the last method passed to it', () => {});
  });
  describe('limbo', () => {
    it('should return an array with the length of 2',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (done) {
        const response = yield Method.limbo(promiseHelper(true));
        expect(typeof response).toBe('object');
        expect(isArr(response)).toBe(true);
        expect(response.length).toBe(2);
        done();
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when the promise is rejected',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (done) {
        const _ref3 = yield Method.limbo(promiseHelper(false)),
              _ref4 = _slicedToArray(_ref3, 2),
              err = _ref4[0],
              data = _ref4[1];

        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual(`Promise Error`);
        done();
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    it('should return null for first slot when an error is not throw',
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(function* (done) {
        const _ref6 = yield Method.limbo(promiseHelper(true)),
              _ref7 = _slicedToArray(_ref6, 2),
              err = _ref7[0],
              data = _ref7[1];

        expect(err).toBe(null);
        done();
      });

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    it('should return promise response for second slot when error is not throw',
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(function* (done) {
        const _ref9 = yield Method.limbo(promiseHelper(true)),
              _ref10 = _slicedToArray(_ref9, 2),
              err = _ref10[0],
              data = _ref10[1];

        expect(data).toEqual(`Promise Valid`);
        done();
      });

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when no promise is passed in',
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(function* (done) {
        const _ref12 = yield Method.limbo(),
              _ref13 = _slicedToArray(_ref12, 2),
              err = _ref13[0],
              data = _ref13[1];

        expect(err instanceof Error).toBe(true);
        done();
      });

      return function (_x5) {
        return _ref11.apply(this, arguments);
      };
    }());
    it('should return an error for first slot when an error is thrown',
    /*#__PURE__*/
    function () {
      var _ref14 = _asyncToGenerator(function* (done) {
        const _ref15 = yield Method.limbo(),
              _ref16 = _slicedToArray(_ref15, 2),
              err = _ref16[0],
              data = _ref16[1];

        expect(err instanceof Error).toBe(true);
        done();
      });

      return function (_x6) {
        return _ref14.apply(this, arguments);
      };
    }());
  });
  describe('uuid', () => {
    it('should return a valid uuid', () => {
      const uuid = Method.uuid();
      if (!uuid || typeof uuid !== 'string') return false;
      const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
      const isValid = regex.test(uuid);
      expect(typeof uuid).toEqual('string');
      expect(isValid).toEqual(true);
    });
    it('should not return uuids that are the same', () => {
      const uuid = Method.uuid();
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
  describe('pipeline', () => {
    const square = x => x * x;

    const subtractBy = (x, y) => x - y;

    const startingValue = 2;
    it('should return the value run through the pipeline', () => {
      const result = Method.pipeline(startingValue, num => num + 1, square);
      expect(result).toEqual(9);
    });
    it('should work with array expressions', () => {
      const result = Method.pipeline(2, square, [subtractBy, 5] // take the square of 2 and subtract 5 from it
      );
      expect(result).toEqual(-1);
    });
    it('should NOT call its first argument, if it is a function', () => {
      const result = Method.pipeline(() => 2, x => x() * 10);
      expect(result).toEqual(20);
    });
    it('should return the element if no functions are specified', () => {
      const element = "foo";
      const result = Method.pipeline(element);
      expect(result).toEqual(element);
    });
    it('should log errors if it encountered an invalid expression', () => {
      const orgError = console.error;
      console.error = jest.fn();
      expect(Method.pipeline(1, square, "invalid expression")).toEqual(1);
      expect(console.error).toHaveBeenCalled();
      console.error = orgError;
    });
  });
});