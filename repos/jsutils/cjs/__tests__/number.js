"use strict";

const Num = require('../number');

describe('/number', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('equalsNaN', () => {
    it('should check if the value is NaN', () => {
      expect(Num.equalsNaN(NaN)).toBe(true);
      expect(Num.equalsNaN(0)).toBe(false);
      expect(Num.equalsNaN(-1)).toBe(false);
      expect(Num.equalsNaN('NaN')).toBe(false);
    });
  });
  describe('isFloat', () => {
    it('should check if a value is a float', () => {
      expect(Num.isFloat(0.34)).toBe(true);
      expect(Num.isFloat(45.2)).toBe(true);
      expect(Num.isFloat(0)).toBe(false);
      expect(Num.isFloat(34)).toBe(false);
      expect(Num.isFloat(NaN)).toBe(false);
      expect(Num.isFloat('foo')).toBe(false);
    });
  });
  describe('isInt', () => {
    it('should check if a value is an int', () => {
      expect(Num.isInt(0)).toBe(true);
      expect(Num.isInt(34)).toBe(true);
      expect(Num.isInt(0.34)).toBe(false);
      expect(Num.isInt(45.2)).toBe(false);
      expect(Num.isInt(NaN)).toBe(false);
      expect(Num.isInt('foo')).toBe(false);
    });
  });
  describe('isNum', () => {
    it('should check if a value is a number, excluding NaN', () => {
      expect(Num.isNum(0)).toBe(true);
      expect(Num.isNum(34)).toBe(true);
      expect(Num.isNum(0.34)).toBe(true);
      expect(Num.isNum(45.2)).toBe(true);
      expect(Num.isNum(NaN)).toBe(false);
      expect(Num.isNum('foo')).toBe(false);
    });
  });
  describe('nth', () => {
    it('should return the proper ext based on the number', () => {
      expect(Num.nth(21)).toBe('st');
      expect(Num.nth(42)).toBe('nd');
      expect(Num.nth(3)).toBe('rd');
      expect(Num.nth(12)).toBe('th');
      expect(Num.nth(4)).toBe('th');
    });
    it('should return correct ext for string numbers', () => {
      expect(Num.nth(21)).toBe('st');
      expect(Num.nth(42)).toBe('nd');
      expect(Num.nth(3)).toBe('rd');
      expect(Num.nth(12)).toBe('th');
      expect(Num.nth(4)).toBe('th');
      expect(Num.nth(11)).toBe('th');
      expect(Num.nth(12)).toBe('th');
      expect(Num.nth(19)).toBe('th');
      expect(Num.nth(60)).toBe('th');
    });
    it('should return empty string for non-number strings and NaN', () => {
      expect(Num.nth('asdgas')).toBe('');
      expect(Num.nth(null)).toBe('');
      expect(Num.nth(undefined)).toBe('');
      expect(Num.nth(NaN)).toBe('');
    });
    it('should handle number as a string', () => {
      expect(Num.nth('1')).toBe('st');
      expect(Num.nth('52')).toBe('nd');
      expect(Num.nth('123')).toBe('rd');
      expect(Num.nth('444')).toBe('th');
      expect(Num.nth('475')).toBe('th');
      expect(Num.nth('18')).toBe('th');
    });
  });
  describe('toFloat', () => {
    it('should convert a value to a float', () => {
      expect(Num.toFloat('44.3')).toEqual(44.3);
      expect(Num.toFloat('0.1')).toEqual(0.1);
      expect(Num.toFloat('asd')).toEqual(0);
    });
    it('should handle numbers inside a string', () => {
      expect(Num.toFloat('$44.30')).toEqual(44.3);
      expect(Num.toFloat('Total: 0.56%')).toEqual(0.56);
    });
  });
  describe('toInt', () => {
    it('should convert a value to an int', () => {
      expect(Num.toInt('44')).toEqual(44);
      expect(Num.toInt('1')).toEqual(1);
      expect(Num.toInt('asd')).toEqual(0);
    });
    it('should handle numbers inside a string', () => {
      expect(Num.toInt('$44.30')).toEqual(44);
      expect(Num.toInt('Total: 56%')).toEqual(56);
    });
  });
  describe('toNum', () => {
    it('should convert a value to a number', () => {
      expect(Num.toNum('44')).toEqual(44);
      expect(Num.toNum('1.34')).toEqual(1.34);
      expect(Num.toNum('asd')).toEqual(0);
    });
    it('should handle numbers inside a string', () => {
      expect(Num.toNum('$44.30')).toEqual(44.30);
      expect(Num.toNum('Total: 56%')).toEqual(56);
    });
  });
  describe('isNonNegative', () => {
    it('should handle integers and floats', () => {
      expect(Num.isNonNegative(0)).toEqual(true);
      expect(Num.isNonNegative(1)).toEqual(true);
      expect(Num.isNonNegative(-1)).toEqual(false);
      expect(Num.isNonNegative(0.123)).toEqual(true);
      expect(Num.isNonNegative(-0.123)).toEqual(false);
    });
    it('should handle other types', () => {
      expect(Num.isNonNegative('hello')).toEqual(false);
      expect(Num.isNonNegative([])).toEqual(false);
    });
  });
});