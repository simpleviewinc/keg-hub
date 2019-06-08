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
  describe('isFunc', function () {
    it('should return true when passed in parm is a function', function () {
      expect(Method.isFunc(jest.fn())).toEqual(true);
    });
    it('should return false when passed in parm is not a function', function () {
      expect(Method.isFunc(null)).toEqual(false);
    });
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
});