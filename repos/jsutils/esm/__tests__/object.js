"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.sub");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Obj = require('../object');

describe('/object', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('cloneJson', function () {
    it('should clone the passed in object, and its children', function () {
      var obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      var clone = Obj.cloneJson(obj);
      expect(_typeof(clone)).toEqual('object');
      expect(clone === obj).toEqual(false);
      expect(clone.sub === obj.sub).toEqual(false);
    });
    it('should call console.error and not throw on invalid json Object', function () {
      var consoleErr = console.error;
      console.error = jest.fn();
      var obj = {
        test: 'I am a string'
      };
      var obj2 = {
        obj: obj,
        data: 'some data'
      };
      obj.obj2 = obj2;
      var clone = Obj.cloneJson(obj);
      expect(console.error).toHaveBeenCalled();
      expect(clone).toEqual(null);
      console.error = consoleErr;
    });
  });
  describe('clearObj', function () {
    it('should remove all props from an object', function () {
      var obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      Obj.clearObj(obj);
      expect('test' in obj).toEqual(false);
      expect('sub' in obj).toEqual(false);
    });
    it('should not remove filtered props', function () {
      var obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      Obj.clearObj(obj, ['sub']);
      expect('test' in obj).toEqual(false);
      expect('sub' in obj).toEqual(true);
    });
  });
  describe('isObj', function () {
    it('should test if data is an object', function () {
      var obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      expect(Obj.isObj(obj)).toEqual(true);
    });
    it('should return false if data is an array', function () {
      var obj = [1, 2, 3];
      expect(Obj.isObj(obj)).toEqual(false);
    });
  });
  describe('deepMerge', function () {
    it('should merge objects together into new object', function () {
      var obj1 = {
        test: 'I am a obj 1',
        sub: [1, 2, 3]
      };
      var obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      var obj3 = Obj.deepMerge(obj1, obj2);
      expect(obj3).not.toEqual(obj1);
      expect(obj3).not.toEqual(obj2);
      expect(obj3.test).toEqual('I am a obj 2');
      expect(obj3.sub.indexOf(1)).toEqual(0);
      expect(obj3.sub.indexOf(4)).toEqual(3);
    });
    it('should handel non-objects passed in as a param', function () {
      var obj1 = {
        test: 'I am a obj 1',
        sub: [1, 2, 3]
      };
      var obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      var obj3 = Obj.deepMerge(obj1, "I am not an object", obj2);
      expect(obj3).not.toEqual(obj1);
      expect(obj3).not.toEqual(obj2);
      expect(obj3.test).toEqual('I am a obj 2');
      expect(obj3.sub.indexOf(1)).toEqual(0);
      expect(obj3.sub.indexOf(4)).toEqual(3);
    });
    it('should handel objects with functions', function () {
      var obj1 = {
        test: 'I am a obj 1',
        method: function method() {}
      };
      var obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      var obj3 = Obj.deepMerge(obj1, obj2);
      expect('method' in obj3).toEqual(true);
      expect('sub' in obj3).toEqual(true);
    });
  });
  describe('deepFreeze', function () {
    it('should recursively freeze an object and its children', function () {
      var obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      Obj.deepFreeze(obj);
      expect(Object.isFrozen(obj)).toEqual(true);
      expect(Object.isFrozen(obj.data)).toEqual(true);
      expect(Object.isFrozen(obj.sub)).toEqual(true);
    });
  });
  describe('mapObj', function () {
    it('should call the callback on all object properties', function () {
      var obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      var keys = [];
      var callBack = jest.fn(function (key, value) {
        return keys.push(key);
      });
      Obj.mapObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
    it('should return array of values retured from the callback', function () {
      var obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      var callBack = jest.fn(function (key, value) {
        return key;
      });
      var keys = Obj.mapObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
  });
  describe('reduceObj', function () {
    it('should call the callback on all object properties', function () {
      var obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      var keys = [];
      var callBack = jest.fn(function (key, value, obj) {
        keys.push(key);
        return obj;
      });
      Obj.reduceObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
    it('should return object from the last callback', function () {
      var obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      var callBack = jest.fn(function (key, value, obj) {
        obj.called = obj.called || 0;
        obj.called += 1;
        return obj;
      });
      var reduceObj = Obj.reduceObj(obj, callBack);
      expect(_typeof(reduceObj)).toEqual('object');
      expect(reduceObj.called).toEqual(3);
    });
  });
  describe('sanitizeCopy', function () {
    it('should strip html from object properties', function () {
      var dirtyObject = {
        name: 'Test name',
        text: '<p>This is the dirty string</p>'
      };
      var cleanText = '&lt;p&gt;This is the dirty string&lt;/p&gt;';
      var cleanObject = Obj.sanitizeCopy(dirtyObject);
      expect(cleanObject).not.toEqual(dirtyObject);
      expect(cleanObject.name).toEqual(dirtyObject.name);
      expect(cleanObject.text).toEqual(cleanText);
    });
  });
  describe('trimStringFields', function () {
    it('should trim all string fields of an object', function () {
      var testObj = {
        test: '   I am A strIng   ',
        data: [1, 2, 3, 4]
      };
      var trimmedObj = Obj.trimStringFields(testObj);
      expect(trimmedObj.test).toEqual('I am A strIng');
    });
    it('should not change non-string fields', function () {
      var testObj = {
        test: '   I am A strIng   ',
        data: [1, 2, 3, 4]
      };
      var trimmedObj = Obj.trimStringFields(testObj);
      expect(trimmedObj.data).toEqual(testObj.data);
    });
  });
});