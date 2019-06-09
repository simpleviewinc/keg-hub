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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Ext = require('../ext');

describe('/ext', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('typeOf', function () {
    it('should return the correct type from the passed in param', function () {
      expect(Ext.typeOf('') === 'String').toBe(true);
      expect(Ext.typeOf('1234') === 'String').toBe(true);
      expect(Ext.typeOf(1234) === 'Number').toBe(true);
      expect(Ext.typeOf({}) === 'Object').toBe(true);
      expect(Ext.typeOf([]) === 'Array').toBe(true);
      expect(Ext.typeOf(undefined) === 'Undefined').toBe(true);
      expect(Ext.typeOf(NaN) === 'Number').toBe(true);
      expect(Ext.typeOf(null) === 'Null').toBe(true);
    });
  });
  describe('isSame', function () {
    it('should check if two passed in arguments are exactly same', function () {
      expect(Ext.isSame(NaN, NaN)).toBe(true);
      expect(Ext.isSame(false, false)).toBe(true);
      expect(Ext.isSame(0, 0)).toBe(true);
      expect(Ext.isSame([], [])).toBe(false);
      expect(Ext.isSame('', ' ')).toBe(false);
      expect(Ext.isSame(Infinity, NaN)).toBe(false);
    });
  });
  describe('isEmpty', function () {
    it('should check if the value is empty for object', function () {
      expect(Ext.isEmpty({})).toBe(true);
      expect(Ext.isEmpty({
        foo: 'bar'
      })).toBe(false);
    });
    it('should check if the value is empty for array', function () {
      expect(Ext.isEmpty([])).toBe(true);
      expect(Ext.isEmpty(['foo'])).toBe(false);
    });
    it('should check if the value is empty for string', function () {
      expect(Ext.isEmpty('')).toBe(true);
      expect(Ext.isEmpty('    ')).toBe(true);
      expect(Ext.isEmpty('  t  ')).toBe(false);
      expect(Ext.isEmpty('foo')).toBe(false);
    });
    it('should check if the value is empty for number', function () {
      expect(Ext.isEmpty(0)).toBe(true);
      expect(Ext.isEmpty(-1)).toBe(true);
      expect(Ext.isEmpty(1)).toBe(false);
    });
  });
  describe('isValidDate', function () {
    it('should check if the input is a valid date', function () {
      expect(Ext.isValidDate(new Date())).toBe(true);
      expect(Ext.isValidDate(new Date('434foo'))).toBe(false);
      expect(Ext.isValidDate({})).toBe(false);
    });
    it('should handle passing in a valid date string', function () {
      var timeStr = new Date().getTime();
      var dateStr = new Date().toString();
      expect(Ext.isValidDate(timeStr)).toBe(true);
      expect(Ext.isValidDate(dateStr)).toBe(true);
      expect(Ext.isValidDate('May 4th 1984')).toBe(false);
    });
  });
  describe('strToType', function () {
    it('should convert a string to its type', function () {
      var falsy = Ext.strToType('false');
      var truthy = Ext.strToType('true');
      var number = Ext.strToType('12345');
      var zero = Ext.strToType('0');
      var object = Ext.strToType('{}');
      var array = Ext.strToType('[]');
      expect(_typeof(falsy)).toBe('boolean');
      expect(falsy === false).toBe(true);
      expect(_typeof(truthy)).toBe('boolean');
      expect(truthy === true).toBe(true);
      expect(_typeof(number)).toBe('number');
      expect(number === 12345).toBe(true);
      expect(_typeof(zero)).toBe('number');
      expect(zero === 0).toBe(true);
      expect(_typeof(object)).toBe('object');
      expect(Array.isArray(array)).toBe(true);
    });
  });
});