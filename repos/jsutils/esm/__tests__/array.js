"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.flat-map");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.unscopables.flat-map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Arr = require('../array');

describe('/array', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('cloneArr', function () {
    it('should create a copy of the passed in array', function () {
      var arr = [1, 2, 3];
      var cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      arr.map(function (item, index) {
        return expect(cloned[index] === item);
      });
    });
    it('should handle non array / object arguments by returning an empty array and not throw', function () {
      var arr = "I am not an array";
      var cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      expect(cloned.length).toBe(0);
    });
    it('should handle object arguments by return an array of entries', function () {
      var arr = {
        1: 1,
        2: 2,
        3: 3
      };
      var cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      cloned.map(function (_ref, index) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return expect(arr[key] === value);
      });
    });
  });
  describe('isArr', function () {
    it('should check for arrays', function () {
      expect(Arr.isArr([1, 2])).toBe(true);
      expect(Arr.isArr([])).toBe(true);
      expect(Arr.isArr({})).toBe(false);
      expect(Arr.isArr("hi")).toBe(false);
      expect(Arr.isArr(1)).toBe(false);
      expect(Arr.isArr(null)).toBe(false);
      expect(Arr.isArr(new Set())).toBe(false);
    });
  });
  describe('randomArr', function () {
    it('should randomly select values from a passed in array', function () {
      var arr = [1, 4, 5, 3, 7, 'test'];
      var random = Arr.randomArr(arr, 3);
      random.map(function (item) {
        return expect(arr.indexOf(item) !== -1).toBe(true);
      });
    });
    it('should arrays with a length equal to the second argument', function () {
      var arr = [1, 4, 5, 3, 7, 'test'];
      var random = Arr.randomArr(arr, 3);
      var random2 = Arr.randomArr(arr, 8);
      var random3 = Arr.randomArr(arr, 1);
      expect(random.length).toBe(3);
      expect(random2.length).toBe(8);
      expect(random3.length).toBe(1);
    });
    it('should return a random array item if no amount is passed in', function () {
      var arr = [1, 4, 5, 3, 7, 'test'];
      var random1 = Arr.randomArr(arr);
      var random2 = Arr.randomArr(arr);
      var random3 = Arr.randomArr(arr);
      expect(arr.indexOf(random1) !== -1).toBe(true);
      expect(arr.indexOf(random2) !== -1).toBe(true);
      expect(arr.indexOf(random3) !== -1).toBe(true);
    });
    it('should return the first argument if its not an array', function () {
      var arr = {
        "test": "object"
      };
      var random = Arr.randomArr(arr);
      expect(arr === random).toBe(true);
    });
  });
  describe('randomizeArr', function () {
    it('should randomly sort the passed in array', function () {
      var arr = [1, 4, 5, 3, 7, 'test'];
      var random1 = Arr.randomizeArr(Array.from(arr));
      var random1Indexes = random1.map(function (value, index) {
        return index;
      });
      random1.map(function (item, index) {
        return expect(arr.indexOf(item) !== -1).toBe(true);
      }); // It's possible that it randomly set the array to be exactly the same
      // But the odds are very low that would happen

      var isDiff;
      random1.map(function (value, index) {
        if (isDiff) return;
        if (value !== arr[index]) isDiff = true;
      });
      expect(isDiff).toBe(true);
    });
    it('should return the first argument if its not an array', function () {
      var arr = {
        "test": "object"
      };
      var random = Arr.randomizeArr(arr);
      expect(arr === random).toBe(true);
    });
  });
  describe('uniqArr', function () {
    it('should remove duplicates from the passed in array', function () {
      var arr = [1, 4, 'test', 1, 7, 'test'];
      var uniq = Arr.uniqArr(arr);
      expect(uniq.length == arr.length - 2).toBe(true);
      var checkArr = [];
      uniq.map(function (value, index) {
        expect(checkArr.indexOf(value) === -1);
        checkArr.push(value);
      });
    });
    it('should return the first argument if its not an array', function () {
      var arr = {
        "test": "object"
      };
      var uniq = Arr.uniqArr(arr);
      expect(arr === uniq).toBe(true);
    });
  });
  describe('omitRange', function () {
    var originalConsole;
    beforeEach(function () {
      originalConsole = console.error;
    });
    afterEach(function () {
      console.error = originalConsole;
    });
    it('should return a new array with the range omitted', function () {
      var array = Object.freeze([1, 2, 3, 4, 5]);
      var newArray = Arr.omitRange(array, 1, 2);
      expect(array).toEqual([1, 2, 3, 4, 5]);
      expect(newArray).not.toBe(array);
      expect(newArray).toEqual([1, 4, 5]);
    });
    it('should work with a count exceeding the length of the array', function () {
      var array = Object.freeze([1, 2, 3, 4, 5]);
      var newArray = Arr.omitRange(array, 0, 9);
      expect(array).toEqual([1, 2, 3, 4, 5]);
      expect(newArray).toEqual([]);
    });
    it("should console error when passing in something other than an array", function () {
      console.error = jest.fn();
      var result = Arr.omitRange(1, 2, 3);
      expect(result).toEqual(1);
      expect(console.error).toBeCalled();
    });
    it("should console error with invalid range input", function () {
      var cases = [[['x'], -1, 1], [['x'], 1, -1], [['x'], null, 1], [['x'], 1, null]];
      cases.forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            arr = _ref4[0],
            start = _ref4[1],
            count = _ref4[2];

        console.error = jest.fn();
        var result = Arr.omitRange(arr, start, count);
        expect(result).toEqual(['x']);
        expect(console.error).toBeCalled();
      });
    });
  });
  describe('flatMap', function () {
    it('should return a flattened, mapped array', function () {
      var arr = [1, 2, 3];
      var result = Arr.flatMap(arr, function (x) {
        return [x * x];
      }); // a regular .map call with the function above would return [ [1], [4], [9] ], but flatMap should flatten:

      expect(result).toEqual([1, 4, 9]);
    });
    it('should ignore flattening when encountering anything other than an array', function () {
      var arr = [1, 2, 3]; // so the mapping function just returns 'hello' for 2. This requires no flattening, whereas the other elements of the array did require flattening
      // this test just makes sure it doesn't error out trying to flatten a non-array

      var result = Arr.flatMap(arr, function (x) {
        return x === 2 ? 'hello' : [x * 3];
      });
      expect(result).toEqual([3, 'hello', 9]);
    });
  });
});