"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Coll = require('../collection');

describe('/collection', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('get', function () {
    it('should get a value on an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data';
      expect(Coll.get(getObj, path) === getObj.data).toBe(true);
    });
    it('should get a deeply nested value on an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return undefined of the value is not found', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.duper';
      expect(Coll.get(getObj, path) === undefined).toBe(true);
    });
    it('should handle arrays as the root object', function () {
      var getObj = [{
        foo: 'duper'
      }];
      var path = '0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
  });
  describe('isColl', function () {
    it('should check if the value is a collection', function () {
      expect(Coll.isColl({})).toBe(true);
      expect(Coll.isColl()).toBe(false);
      expect(Coll.isColl([])).toBe(true);
      expect(Coll.isColl(function () {})).toBe(false);
      expect(Coll.isColl(1)).toBe(false);
      expect(Coll.isColl('')).toBe(false);
      expect(Coll.isColl(null)).toBe(false);
      expect(Coll.isColl(NaN)).toBe(false);
    });
  });
  describe('mapColl', function () {
    it('should loop over a collection of items', function () {
      var counter = 0;
      var res = Coll.mapColl([1, 2, 3, 4], function () {
        counter++;
        return counter;
      });
      expect(counter).toBe(4);
      expect(Array.isArray(res)).toBe(true);
    });
    it('should return as array when an object is passed in', function () {
      var counter = 0;
      var res = Coll.mapColl({
        1: 1,
        2: 2,
        3: 3
      }, function (key, value, coll) {
        counter++;
        return counter;
      });
      expect(counter).toBe(3);
      expect(Array.isArray(res)).toBe(true);
      expect(_typeof(res) === 'object').toBe(true);
    });
  });
  describe('reduceColl', function () {
    it('should loop over a collection of items', function () {
      var counter = 0;
      var res = Coll.reduceColl([1, 2, 3, 4], function (key, value, org, reduced) {
        counter++;
        return counter;
      }, 0);
      expect(counter).toBe(4);
      expect(counter === res).toBe(true);
    });
    it('should return a reduced value', function () {
      var counter = 0;
      var res = Coll.reduceColl([1, 2, 3, 4], function (key, value, org, reduced) {
        counter++;
        reduced[value] = counter;
        return reduced;
      }, {});
      expect(counter).toBe(4);
      expect(_typeof(res) === 'object').toBe(true);
      expect(Object.keys(res).length === 4).toBe(true);
    });
  });
  describe('set', function () {
    it('should set a value on an object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.1';
      Coll.set(setObj, path, 'bar');
      expect(setObj.data[1] === 'bar').toBe(true);
    });
    it('should set a deeply nested value on an object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.bar';
      Coll.set(setObj, path, 'test');
      expect(setObj.data[0].bar === 'test').toBe(true);
    });
    it('should return the original object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.bar';
      var res = Coll.set(setObj, path, 'test');
      expect(setObj === res).toBe(true);
    });
  });
  describe('unset', function () {
    it('should remove a value from an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0';
      Coll.unset(getObj, path);
      expect(getObj.data[0] === undefined).toBe(true);
    });
    it('should remove a value from an deeply nested object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      Coll.unset(getObj, path);
      expect(getObj.data[0].foo === undefined).toBe(true);
    });
    it('should return true if the value was removed', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      var res = Coll.unset(getObj, path);
      expect(res).toBe(true);
    });
  });
});