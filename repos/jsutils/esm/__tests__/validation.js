"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('../validation'),
    validate = _require.validate;

var _require2 = require('../array'),
    isArr = _require2.isArr;

var _require3 = require('../string'),
    isStr = _require3.isStr;

var _require4 = require('../number'),
    isNum = _require4.isNum;

var _require5 = require('jestlib'),
    mockConsole = _require5.mockConsole;

describe('validate', function () {
  var resetMocks = null;
  beforeEach(function () {
    resetMocks = mockConsole(['error']);
  });
  afterEach(function () {
    resetMocks();
    jest.resetAllMocks();
    validate.resetOptions();
  });
  it('should validate all conditions, returning true if all are valid', function () {
    var x = 3;
    var y = 'hello';
    var z = [];

    var _validate = validate({
      x: x,
      y: y,
      z: z
    }, {
      x: function x(_x) {
        return _x > 0;
      },
      y: isStr,
      z: isArr
    }),
        _validate2 = _slicedToArray(_validate, 1),
        isValid = _validate2[0];

    expect(isValid).toBe(true);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('should return false for a failure, and it should error log that failure', function () {
    var x = 3;
    var y = 1;
    var z = 'wow';

    var _validate3 = validate({
      x: x,
      y: y,
      z: z
    }, {
      x: function x(_x2) {
        return _x2 < 0;
      },
      y: isStr,
      z: isArr
    }),
        _validate4 = _slicedToArray(_validate3, 1),
        isValid = _validate4[0];

    expect(isValid).toBe(false);
    expect(console.error).toHaveBeenCalledTimes(3);
  });
  it('should work with the $default parameter', function () {
    var x = 3;
    var y = 1;
    var z = 'wow';

    var _validate5 = validate({
      x: x,
      y: y,
      z: z
    }, {
      $default: isNum,
      z: isStr
    }),
        _validate6 = _slicedToArray(_validate5, 1),
        isValid = _validate6[0];

    expect(isValid).toBe(true);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('should return failed cases object', function () {
    var x = 3;
    var y = 1;
    var z = 'wow';

    var _validate7 = validate({
      x: x,
      y: y,
      z: z
    }, {
      x: function x(_x3) {
        return _x3 < 0;
      },
      y: isStr,
      z: isArr
    }),
        _validate8 = _slicedToArray(_validate7, 2),
        isValid = _validate8[0],
        results = _validate8[1];

    expect(results.x.success).toBe(false);
    expect(results.x.reason.length > 0).toBe(true);
    expect(isValid).toBe(false);
    expect(console.error).toHaveBeenCalledTimes(3);
  });
  describe('options', function () {
    it('should handle the throws option', function () {
      var x = 3;
      expect(function () {
        return validate({
          x: x
        }, {
          x: isArr
        }, {
          "throws": true
        });
      }).toThrow();
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the logs option', function () {
      var x = 1;

      var _validate9 = validate({
        x: x
      }, {
        x: isArr
      }, {
        logs: false
      }),
          _validate10 = _slicedToArray(_validate9, 1),
          valid = _validate10[0];

      expect(valid).toBe(false);
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the prefix option', function () {
      var prefix = '123';
      var x = 1;
      validate({
        x: x
      }, {
        x: isArr
      }, {
        prefix: prefix
      });
      expect(console.error).toHaveBeenCalledWith(prefix, "Argument \"x\" with value ", 1, " failed validator: isArr.");
    });
  });
  describe('global options', function () {
    it('should handle the throws global', function () {
      validate.setOptions({
        "throws": true,
        logs: false
      });
      var x = 1;
      expect(function () {
        return validate({
          x: x
        }, {
          x: function x(_x4) {
            return _x4 < 0;
          }
        });
      }).toThrow();
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the logs global', function () {
      validate.setOptions({
        logs: false
      });
      var x = 1;

      var _validate11 = validate({
        x: x
      }, {
        x: isArr
      }),
          _validate12 = _slicedToArray(_validate11, 1),
          valid = _validate12[0];

      expect(valid).toBe(false);
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the prefix global', function () {
      var options = {
        prefix: '123'
      };
      validate.setOptions(options);
      var x = 1;
      validate({
        x: x
      }, {
        x: isArr
      });
      expect(console.error).toHaveBeenCalledWith(options.prefix, "Argument \"x\" with value ", 1, " failed validator: isArr.");
    });
  });
});