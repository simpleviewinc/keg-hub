"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.sub");

require("core-js/modules/web.dom-collections.iterator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Obj = require('../object');

var _require = require('../array'),
    isArr = _require.isArr;

var _require2 = require('../string'),
    snakeCase = _require2.snakeCase;

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
    it('should merge child objects together into new object', function () {
      var childObj = {
        arr: ['data'],
        obj: {
          foo: 'bar'
        }
      };
      var childObj2 = {
        bas: 'baz'
      };
      var obj1 = {
        test: 'I am a obj 1',
        sub: [childObj, 1, 2, 3]
      };
      var obj2 = {
        test: 'I am a obj 2',
        sub: [childObj2, 4, 5, 6]
      };
      expect(obj1.sub.indexOf(childObj)).toBe(0);
      expect(obj1.sub[0].arr).toBe(childObj.arr);
      expect(obj1.sub[0].obj).toBe(childObj.obj);
      expect(obj2.sub.indexOf(childObj2)).toBe(0);
      var obj3 = Obj.deepMerge(obj1, obj2);
      expect(obj3.sub.indexOf(childObj)).toBe(-1);
      expect(obj3.sub.indexOf(childObj2)).toBe(-1);
      expect(Array.isArray(obj3.sub[0].arr)).toBe(true);
      expect(obj3.sub[0].arr).not.toBe(childObj.arr);
      expect(obj3.sub[0].arr[0]).toBe(childObj.arr[0]);
      expect(_typeof(obj3.sub[0].obj)).toBe('object');
      expect(obj3.sub[0].obj).not.toBe(childObj.obj);
      expect(obj3.sub[0].obj.foo).toBe(childObj.obj.foo);
      expect(obj3.sub[4].bas).toBe('baz');
      var subObj = {
        data: 'foo'
      };
      var arr1 = [subObj];
      var arr2 = [arr1];
      var arr3 = [arr2];
      var arr4 = [];
      expect(arr3[0]).toBe(arr2);
      expect(arr2[0]).toBe(arr1);
      expect(arr1[0]).toBe(subObj);
      var arr5 = Obj.deepMerge(arr4, arr3);
      var arr3Copy = arr5;
      var arr2Copy = arr5[0];
      var arr1Copy = arr5[0][0];
      var subObjCopy = arr5[0][0][0];
      expect(arr3Copy).not.toBe(arr3);
      expect(arr2Copy).not.toBe(arr2);
      expect(arr1Copy).not.toBe(arr1);
      expect(subObjCopy.data).toBe('foo');
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
  describe('omitKeys', function () {
    it('should return object without keys in passed in array', function () {
      var obj = {
        test: 'I should exist',
        sub: [1, 2, 3],
        data: 'I should not exist'
      };
      var omitted = Obj.omitKeys(obj, ['data', 'sub']);
      expect(omitted.sub).toEqual(undefined);
      expect(omitted.data).toEqual(undefined);
      expect(omitted.test).toEqual('I should exist');
    });
    it('should return empty object if first param is not an object', function () {
      var emptyObj = Obj.omitKeys('I am not an object', []);
      expect(Obj.isObj(emptyObj)).toBe(true);
      expect(Object.keys(emptyObj).length).toEqual(0);
    });
  });
  describe('pickKeys', function () {
    it('should return object with keys in passed in array', function () {
      var obj = {
        test: 'I should exist',
        sub: [1, 2, 3],
        data: 'I should not exist'
      };
      var picked = Obj.pickKeys(obj, ['data', 'sub']);
      expect(picked.sub).toEqual(obj.sub);
      expect(picked.data).toEqual(obj.data);
      expect(picked.test).toEqual(undefined);
    });
    it('should not add non-existing keys to the return object', function () {
      var obj = {
        test: 'I should exist',
        sub: [1, 2, 3],
        data: 'I should not exist'
      };
      var picked = Obj.pickKeys(obj, ['data', 'sub', 'duper']);
      expect(picked.sub).toEqual(obj.sub);
      expect(picked.data).toEqual(obj.data);
      expect('duper' in picked).toEqual(false);
    });
    it('should return empty object if first param is not an object', function () {
      var emptyObj = Obj.pickKeys('I am not an object', []);
      expect(Obj.isObj(emptyObj)).toBe(true);
      expect(Object.keys(emptyObj).length).toEqual(0);
    });
  });
  describe('keyMap', function () {
    it('should return object with keys and values equal to values in array', function () {
      var arr = ['test', 'foo', 'bar', 'data', 'sub'];
      var mapped = Obj.keyMap(arr);
      Obj.reduceObj(mapped, function (key, value) {
        expect(key).toEqual(value);
        expect(arr.indexOf(key)).not.toEqual(-1);
        expect(arr.indexOf(value)).not.toEqual(-1);
      });
    });
    it('should convert key and value to uppercase if second param is true', function () {
      var arr = ['test', 'foo', 'bar', 'data', 'sub'];
      var mapped = Obj.keyMap(arr, true);
      arr.map(function (key) {
        expect(key.toUpperCase() in mapped).toEqual(true);
        expect(mapped[key.toUpperCase()]).toEqual(key.toUpperCase());
      });
    });
  });
  describe('applyToCloneOf', function () {
    it('should return a clone with the changes, leaving the original object unchanged', function () {
      var orig = {
        a: 1,
        b: 2
      };
      var result = Obj.applyToCloneOf(orig, function (clone) {
        clone.a = 42;
      });
      expect(orig.a).toEqual(1);
      expect(result.a).toEqual(42);
      expect(result.b).toEqual(2);
    });
    it('should call console.warn on bad input', function () {
      var orgWarn = console.warn;
      console.warn = jest.fn();
      Obj.applyToCloneOf(null, function () {});
      expect(console.warn).toHaveBeenCalled();
      console.warn.mockClear();
      Obj.applyToCloneOf(1, function () {});
      expect(console.warn).toHaveBeenCalled();
      console.warn.mockClear();
      Obj.applyToCloneOf({}, null);
      expect(console.warn).toHaveBeenCalled();
      console.warn.mockClear();
      Obj.applyToCloneOf({}, "I am not a function");
      expect(console.warn).toHaveBeenCalled();
      console.warn.mockClear();
      console.warn = orgWarn;
    });
    it('should return the original object when on bad input', function () {
      var orgWarn = console.warn;
      console.warn = jest.fn();
      var original = {};
      var notClone = Obj.applyToCloneOf(original, null);
      expect(console.warn).toHaveBeenCalled();
      expect(notClone === original).toEqual(true);
      console.warn = orgWarn;
    });
    it('should work with delete', function () {
      var orig = {
        a: 1,
        b: 2
      };
      var updated = Obj.applyToCloneOf(orig, function (clone) {
        delete clone['a'];
      });
      expect(updated.a).toEqual(undefined);
      expect(orig.a).toEqual(1);
    });
  });
  describe('everyEntry', function () {
    it('should work across an object\'s entries', function () {
      var foo = {
        a: 1,
        b: 2,
        c: 3
      };
      var result = Obj.everyEntry(foo, function (k, v) {
        return v > 2;
      });
      expect(result).toBe(false);
      result = Obj.everyEntry(foo, function (k, v) {
        return v > 0;
      });
      expect(result).toBe(true);
    });
    it('should log errors and return false if invalid input was passed', function () {
      var orgError = console.error;
      var outputArr = [];

      console.error = function (output) {
        return outputArr.push(output);
      };

      var aString = "neither a function nor object";
      expect(Obj.everyEntry(null, function () {})).toEqual(false);
      expect(Obj.everyEntry({}, aString)).toEqual(false);
      expect(Obj.everyEntry(aString, function () {})).toEqual(false);
      expect(outputArr.length).toEqual(3);
      console.error = orgError;
    });
  });
  describe('someEntry', function () {
    it('should work across an object\'s entries', function () {
      var foo = {
        a: 1,
        b: 2,
        c: 3
      };
      var result = Obj.someEntry(foo, function (k, v) {
        return v > 2;
      });
      expect(result).toBe(true);
      result = Obj.someEntry(foo, function (k, v) {
        return v > 4;
      });
      expect(result).toBe(false);
    });
    it('should log errors and return false if invalid input was passed', function () {
      var orgError = console.error;
      var outputArr = [];

      console.error = function (output) {
        return outputArr.push(output);
      };

      var aString = "neither a function nor object";
      expect(Obj.someEntry(null, function () {})).toEqual(false);
      expect(Obj.someEntry({}, aString)).toEqual(false);
      expect(Obj.someEntry(aString, function () {})).toEqual(false);
      expect(outputArr.length).toEqual(3);
      console.error = orgError;
    });
  });
  describe('filterObj', function () {
    it('should work across an object\'s entries', function () {
      var foo = {
        a: 1,
        b: 2,
        c: 3
      };
      var result = Obj.filterObj(foo, function (k, v) {
        return v > 2;
      });
      expect(result.a).toBe(undefined);
      expect(result.b).toBe(undefined);
      expect(result.c).toBe(foo.c);
    });
    it('should log errors and return the obj argument if invalid input was passed', function () {
      var orgError = console.error;
      var outputArr = [];

      console.error = function (output) {
        return outputArr.push(output);
      };

      var aString = "not an object";
      expect(Obj.filterObj(aString, function () {})).toEqual(aString);
      expect(Obj.filterObj({}, null)).toEqual({});
      expect(outputArr.length).toEqual(2);
      console.error = orgError;
    });
  });
  describe('mapEntries', function () {
    it('should work with objects and return an object', function () {
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };
      var expected = {
        a: 1,
        b: 4,
        c: 9
      };
      var result = Obj.mapEntries(obj, function (key, val) {
        return [key, val * val];
      });
      expect(Obj.isObj(result)).toBe(true);
      expect(result).toEqual(expected);
    });
    it('should work with arrays and return an array', function () {
      var obj = [1, 2, 3];
      var expected = [1, 4, 9];
      var result = Obj.mapEntries(obj, function (key, val) {
        return [key, val * val];
      });
      expect(isArr(result)).toBe(true);
      expect(result).toEqual(expected);
    });
    it("should log an error when the cb function does not return an entry", function () {
      var orgError = console.error;
      console.error = jest.fn();
      var result = Obj.mapEntries({
        a: 1
      }, function (key, value) {
        return value * 2;
      });
      expect(console.error).toHaveBeenCalled(); // it ignores any entries that don't return an entry when passed into the cb

      expect(result).toEqual({
        a: 1
      });
      console.error = orgError;
    });
    it("can change keys", function () {
      var result = Obj.mapEntries({
        a: 1
      }, function (key, value) {
        return ['b', value];
      });
      expect(result.b).toEqual(1);
      expect(result.a).toEqual(undefined);
    });
    it("should log an error and return the input if the input is invalid", function () {
      var orgError = console.error;
      console.error = jest.fn();
      var result = Obj.mapEntries(1, function () {});
      expect(console.error).toHaveBeenCalled();
      expect(result).toEqual(1);
      console.error = jest.fn();
      var nextResult = Obj.mapEntries({});
      expect(console.error).toHaveBeenCalled();
      console.error = orgError;
      expect(nextResult).toEqual({});
    });
  });
  describe("isEntry", function () {
    it("should return true if the input is an entry, false otherwise", function () {
      var cases = [[[1, 2], true], [[1, 2, 3], false], [[1], false], [{}, false], [null, false], [[], false]];
      cases.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            entry = _ref2[0],
            expectedResult = _ref2[1];

        var result = Obj.isEntry(entry);
        expect(result).toBe(expectedResult);
      });
    });
    it("should check that the first element is number or string", function () {
      var cases = [[["id", 1], true], [[0, "value"], true], [[new Date(), "value"], false], [[true, "value"], false]];
      cases.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            entry = _ref4[0],
            expectedResult = _ref4[1];

        var result = Obj.isEntry(entry);
        expect(result).toBe(expectedResult);
      });
    });
  });
  describe('mapKeys', function () {
    it('should map all the keys of an object', function () {
      var obj = {
        'fooBar': 'wow',
        'PascalCase': 'whoa',
        'css-crap': 'hyphenated'
      };
      var result = Obj.mapKeys(obj, snakeCase);
      expect(result.foo_bar).toEqual(obj.fooBar);
      expect(result.pascal_case).toEqual(obj.PascalCase);
      expect(result.css_crap).toEqual(obj['css-crap']);
    });
  });
});