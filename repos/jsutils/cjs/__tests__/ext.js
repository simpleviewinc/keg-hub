"use strict";

const Ext = require('../ext');

describe('/ext', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('typeOf', () => {
    it('should return the correct type from the passed in param', () => {
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
  describe('isSame', () => {
    it('should check if two passed in arguments are exactly same', () => {
      expect(Ext.isSame(NaN, NaN)).toBe(true);
      expect(Ext.isSame(false, false)).toBe(true);
      expect(Ext.isSame(0, 0)).toBe(true);
      expect(Ext.isSame([], [])).toBe(false);
      expect(Ext.isSame('', ' ')).toBe(false);
      expect(Ext.isSame(Infinity, NaN)).toBe(false);
    });
  });
  describe('isEmpty', () => {
    it('should check if the value is empty for object', () => {
      expect(Ext.isEmpty({})).toBe(true);
      expect(Ext.isEmpty({
        foo: 'bar'
      })).toBe(false);
    });
    it('should check if the value is empty for array', () => {
      expect(Ext.isEmpty([])).toBe(true);
      expect(Ext.isEmpty(['foo'])).toBe(false);
    });
    it('should check if the value is empty for string', () => {
      expect(Ext.isEmpty('')).toBe(true);
      expect(Ext.isEmpty('    ')).toBe(true);
      expect(Ext.isEmpty('  t  ')).toBe(false);
      expect(Ext.isEmpty('foo')).toBe(false);
    });
    it('should check if the value is empty for number', () => {
      expect(Ext.isEmpty(0)).toBe(true);
      expect(Ext.isEmpty(-1)).toBe(true);
      expect(Ext.isEmpty(1)).toBe(false);
    });
  });
  describe('isValidDate', () => {
    it('should check if the input is a valid date', () => {
      expect(Ext.isValidDate(new Date())).toBe(true);
      expect(Ext.isValidDate(new Date('434foo'))).toBe(false);
      expect(Ext.isValidDate({})).toBe(false);
    });
    it('should handle passing in a valid date string', () => {
      const timeStr = new Date().getTime();
      const dateStr = new Date().toString();
      expect(Ext.isValidDate(timeStr)).toBe(true);
      expect(Ext.isValidDate(dateStr)).toBe(true);
      expect(Ext.isValidDate('May 4th 1984')).toBe(false);
    });
  });
  describe('strToType', () => {
    it('should convert a string to its type', () => {
      const falsy = Ext.strToType('false');
      const truthy = Ext.strToType('true');
      const number = Ext.strToType('12345');
      const zero = Ext.strToType('0');
      const object = Ext.strToType('{}');
      const array = Ext.strToType('[]');
      expect(typeof falsy).toBe('boolean');
      expect(falsy === false).toBe(true);
      expect(typeof truthy).toBe('boolean');
      expect(truthy === true).toBe(true);
      expect(typeof number).toBe('number');
      expect(number === 12345).toBe(true);
      expect(typeof zero).toBe('number');
      expect(zero === 0).toBe(true);
      expect(typeof object).toBe('object');
      expect(Array.isArray(array)).toBe(true);
    });
  });
});