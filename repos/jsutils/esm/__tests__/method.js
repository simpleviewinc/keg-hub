"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Method = require('../method');

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
    it('should execute the callback n times based on passed in param', function () {});
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
    it('should call its first argument, if it is a function', function () {
      var result = Method.pipeline(function () {
        return 2;
      }, function (x) {
        return x * 10;
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