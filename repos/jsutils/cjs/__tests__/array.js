"use strict";

const Arr = require('../array');

describe('/array', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('cloneArr', () => {
    it('should ', () => {});
  });
  describe('isArr', () => {
    it('should check for arrays', () => {
      expect(Arr.isArr([1, 2])).toBe(true);
      expect(Arr.isArr([])).toBe(true);
      expect(Arr.isArr({})).toBe(false);
      expect(Arr.isArr("hi")).toBe(false);
      expect(Arr.isArr(1)).toBe(false);
      expect(Arr.isArr(null)).toBe(false);
      expect(Arr.isArr(new Set())).toBe(false);
    });
  });
  describe('randomArray', () => {
    it('should ', () => {});
  });
  describe('randomizeArray', () => {
    it('should ', () => {});
  });
  describe('uniqArr', () => {
    it('should ', () => {});
  });
  describe('omitRange', () => {
    let originalConsole;
    beforeEach(() => {
      originalConsole = console.error;
    });
    afterEach(() => {
      console.error = originalConsole;
    });
    it('should return a new array with the range omitted', () => {
      const array = Object.freeze([1, 2, 3, 4, 5]);
      const newArray = Arr.omitRange(array, 1, 2);
      expect(array).toEqual([1, 2, 3, 4, 5]);
      expect(newArray).not.toBe(array);
      expect(newArray).toEqual([1, 4, 5]);
    });
    it('should work with a count exceeding the length of the array', () => {
      const array = Object.freeze([1, 2, 3, 4, 5]);
      const newArray = Arr.omitRange(array, 0, 9);
      expect(array).toEqual([1, 2, 3, 4, 5]);
      expect(newArray).toEqual([]);
    });
    it("should console error when passing in something other than an array", () => {
      console.error = jest.fn();
      const result = Arr.omitRange(1, 2, 3);
      expect(result).toEqual(1);
      expect(console.error).toBeCalled();
    });
    it("should console error with invalid range input", () => {
      const cases = [[['x'], -1, 1], [['x'], 1, -1], [['x'], null, 1], [['x'], 1, null]];
      cases.forEach(([arr, start, count]) => {
        console.error = jest.fn();
        const result = Arr.omitRange(arr, start, count);
        expect(result).toEqual(['x']);
        expect(console.error).toBeCalled();
      });
    });
  });
});