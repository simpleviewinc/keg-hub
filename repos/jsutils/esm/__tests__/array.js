"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

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
    it('should ', function () {});
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
  describe('randomArray', function () {
    it('should ', function () {});
  });
  describe('randomizeArray', function () {
    it('should ', function () {});
  });
  describe('uniqArr', function () {
    it('should ', function () {});
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
      cases.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            arr = _ref2[0],
            start = _ref2[1],
            count = _ref2[2];

        console.error = jest.fn();
        var result = Arr.omitRange(arr, start, count);
        expect(result).toEqual(['x']);
        expect(console.error).toBeCalled();
      });
    });
  });
});