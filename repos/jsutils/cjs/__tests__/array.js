"use strict";

const Arr = require('../array');

describe('/array', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('cloneArr', () => {
    it('should create a copy of the passed in array', () => {
      const arr = [1, 2, 3];
      const cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      arr.map((item, index) => expect(cloned[index] === item));
    });
    it('should handle non array / object arguments by returning an empty array and not throw', () => {
      const arr = "I am not an array";
      const cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      expect(cloned.length).toBe(0);
    });
    it('should handle object arguments by return an array of entries', () => {
      const arr = {
        1: 1,
        2: 2,
        3: 3
      };
      const cloned = Arr.cloneArr(arr);
      expect(Array.isArray(cloned)).toBe(true);
      expect(cloned === arr).toBe(false);
      cloned.map(([key, value], index) => expect(arr[key] === value));
    });
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
  describe('randomArr', () => {
    it('should randomly select values from a passed in array', () => {
      const arr = [1, 4, 5, 3, 7, 'test'];
      const random = Arr.randomArr(arr, 3);
      random.map(item => expect(arr.indexOf(item) !== -1).toBe(true));
    });
    it('should arrays with a length equal to the second argument', () => {
      const arr = [1, 4, 5, 3, 7, 'test'];
      const random = Arr.randomArr(arr, 3);
      const random2 = Arr.randomArr(arr, 8);
      const random3 = Arr.randomArr(arr, 1);
      expect(random.length).toBe(3);
      expect(random2.length).toBe(8);
      expect(random3.length).toBe(1);
    });
    it('should return a random array item if no amount is passed in', () => {
      const arr = [1, 4, 5, 3, 7, 'test'];
      const random1 = Arr.randomArr(arr);
      const random2 = Arr.randomArr(arr);
      const random3 = Arr.randomArr(arr);
      expect(arr.indexOf(random1) !== -1).toBe(true);
      expect(arr.indexOf(random2) !== -1).toBe(true);
      expect(arr.indexOf(random3) !== -1).toBe(true);
    });
    it('should return the first argument if its not an array', () => {
      const arr = {
        "test": "object"
      };
      const random = Arr.randomArr(arr);
      expect(arr === random).toBe(true);
    });
  });
  describe('randomizeArr', () => {
    it('should randomly sort the passed in array', () => {
      const arr = [1, 4, 5, 3, 7, 'test'];
      const random1 = Arr.randomizeArr(Array.from(arr));
      const random1Indexes = random1.map((value, index) => index);
      random1.map((item, index) => expect(arr.indexOf(item) !== -1).toBe(true)); // It's possible that it randomly set the array to be exactly the same
      // But the odds are very low that would happen

      let isDiff;
      random1.map((value, index) => {
        if (isDiff) return;
        if (value !== arr[index]) isDiff = true;
      });
      expect(isDiff).toBe(true);
    });
    it('should return the first argument if its not an array', () => {
      const arr = {
        "test": "object"
      };
      const random = Arr.randomizeArr(arr);
      expect(arr === random).toBe(true);
    });
  });
  describe('uniqArr', () => {
    it('should remove duplicates from the passed in array', () => {
      const arr = [1, 4, 'test', 1, 7, 'test'];
      const uniq = Arr.uniqArr(arr);
      expect(uniq.length == arr.length - 2).toBe(true);
      const checkArr = [];
      uniq.map((value, index) => {
        expect(checkArr.indexOf(value) === -1);
        checkArr.push(value);
      });
    });
    it('should return the first argument if its not an array', () => {
      const arr = {
        "test": "object"
      };
      const uniq = Arr.uniqArr(arr);
      expect(arr === uniq).toBe(true);
    });
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
  describe('flatMap', () => {
    it('should return a flattened, mapped array', () => {
      const arr = [1, 2, 3];
      const result = Arr.flatMap(arr, x => [x * x]); // a regular .map call with the function above would return [ [1], [4], [9] ], but flatMap should flatten:

      expect(result).toEqual([1, 4, 9]);
    });
    it('should ignore flattening when encountering anything other than an array', () => {
      const arr = [1, 2, 3]; // so the mapping function just returns 'hello' for 2. This requires no flattening, whereas the other elements of the array did require flattening
      // this test just makes sure it doesn't error out trying to flatten a non-array

      const result = Arr.flatMap(arr, x => x === 2 ? 'hello' : [x * 3]);
      expect(result).toEqual([3, 'hello', 9]);
    });
  });
});