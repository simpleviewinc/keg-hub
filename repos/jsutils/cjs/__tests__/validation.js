"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const _require = require('../validation'),
      validate = _require.validate;

const _require2 = require('../array'),
      isArr = _require2.isArr;

const _require3 = require('../string'),
      isStr = _require3.isStr;

const _require4 = require('../number'),
      isNum = _require4.isNum;

const _require5 = require('jestlib'),
      mockConsole = _require5.mockConsole;

describe('validate', () => {
  let resetMocks = null;
  beforeEach(() => {
    resetMocks = mockConsole(['error']);
  });
  afterEach(() => {
    resetMocks();
    jest.resetAllMocks();
    validate.resetOptions();
  });
  it('should validate all conditions, returning true if all are valid', () => {
    const x = 3;
    const y = 'hello';
    const z = [];

    const _validate = validate({
      x,
      y,
      z
    }, {
      x: _x => _x > 0,
      y: isStr,
      z: isArr
    }),
          _validate2 = _slicedToArray(_validate, 1),
          isValid = _validate2[0];

    expect(isValid).toBe(true);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('should return false for a failure, and it should error log that failure', () => {
    const x = 3;
    const y = 1;
    const z = 'wow';

    const _validate3 = validate({
      x,
      y,
      z
    }, {
      x: _x2 => _x2 < 0,
      y: isStr,
      z: isArr
    }),
          _validate4 = _slicedToArray(_validate3, 1),
          isValid = _validate4[0];

    expect(isValid).toBe(false);
    expect(console.error).toHaveBeenCalledTimes(3);
  });
  it('should work with the $default parameter', () => {
    const x = 3;
    const y = 1;
    const z = 'wow';

    const _validate5 = validate({
      x,
      y,
      z
    }, {
      $default: isNum,
      z: isStr
    }),
          _validate6 = _slicedToArray(_validate5, 1),
          isValid = _validate6[0];

    expect(isValid).toBe(true);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('should return failed cases object', () => {
    const x = 3;
    const y = 1;
    const z = 'wow';

    const _validate7 = validate({
      x,
      y,
      z
    }, {
      x: _x3 => _x3 < 0,
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
  describe('options', () => {
    it('should handle the throws option', () => {
      const x = 3;
      expect(() => validate({
        x
      }, {
        x: isArr
      }, {
        "throws": true
      })).toThrow();
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the logs option', () => {
      const x = 1;

      const _validate9 = validate({
        x
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
    it('should handle the prefix option', () => {
      const prefix = '123';
      const x = 1;
      validate({
        x
      }, {
        x: isArr
      }, {
        prefix
      });
      expect(console.error).toHaveBeenCalledWith(prefix, "Argument \"x\" with value ", 1, " failed validator: isArr.");
    });
  });
  describe('global options', () => {
    it('should handle the throws global', () => {
      validate.setOptions({
        "throws": true,
        logs: false
      });
      const x = 1;
      expect(() => validate({
        x
      }, {
        x: _x4 => _x4 < 0
      })).toThrow();
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the logs global', () => {
      validate.setOptions({
        logs: false
      });
      const x = 1;

      const _validate11 = validate({
        x
      }, {
        x: isArr
      }),
            _validate12 = _slicedToArray(_validate11, 1),
            valid = _validate12[0];

      expect(valid).toBe(false);
      expect(console.error).toHaveBeenCalledTimes(0);
    });
    it('should handle the prefix global', () => {
      const options = {
        prefix: '123'
      };
      validate.setOptions(options);
      const x = 1;
      validate({
        x
      }, {
        x: isArr
      });
      expect(console.error).toHaveBeenCalledWith(options.prefix, "Argument \"x\" with value ", 1, " failed validator: isArr.");
    });
  });
});