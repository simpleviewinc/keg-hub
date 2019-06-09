"use strict";

const Coll = require('../collection');

describe('/collection', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('get', () => {
    it('should get a value on an object', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data';
      expect(Coll.get(getObj, path) === getObj.data).toBe(true);
    });
    it('should get a deeply nested value on an object', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return undefined of the value is not found', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.duper';
      expect(Coll.get(getObj, path) === undefined).toBe(true);
    });
    it('should handle arrays as the root object', () => {
      const getObj = [{
        foo: 'duper'
      }];
      const path = '0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
  });
  describe('isColl', () => {
    it('should check if the value is a collection', () => {
      expect(Coll.isColl({})).toBe(true);
      expect(Coll.isColl()).toBe(false);
      expect(Coll.isColl([])).toBe(true);
      expect(Coll.isColl(() => {})).toBe(false);
      expect(Coll.isColl(1)).toBe(false);
      expect(Coll.isColl('')).toBe(false);
      expect(Coll.isColl(null)).toBe(false);
      expect(Coll.isColl(NaN)).toBe(false);
    });
  });
  describe('mapColl', () => {
    it('should loop over a collection of items', () => {
      let counter = 0;
      const res = Coll.mapColl([1, 2, 3, 4], () => {
        counter++;
        return counter;
      });
      expect(counter).toBe(4);
      expect(Array.isArray(res)).toBe(true);
    });
    it('should return as array when an object is passed in', () => {
      let counter = 0;
      const res = Coll.mapColl({
        1: 1,
        2: 2,
        3: 3
      }, (key, value, coll) => {
        counter++;
        return counter;
      });
      expect(counter).toBe(3);
      expect(Array.isArray(res)).toBe(true);
      expect(typeof res === 'object').toBe(true);
    });
  });
  describe('reduceColl', () => {
    it('should loop over a collection of items', () => {
      let counter = 0;
      const res = Coll.reduceColl([1, 2, 3, 4], (key, value, org, reduced) => {
        counter++;
        return counter;
      }, 0);
      expect(counter).toBe(4);
      expect(counter === res).toBe(true);
    });
    it('should return a reduced value', () => {
      let counter = 0;
      const res = Coll.reduceColl([1, 2, 3, 4], (key, value, org, reduced) => {
        counter++;
        reduced[value] = counter;
        return reduced;
      }, {});
      expect(counter).toBe(4);
      expect(typeof res === 'object').toBe(true);
      expect(Object.keys(res).length === 4).toBe(true);
    });
  });
  describe('set', () => {
    it('should set a value on an object', () => {
      const setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.1';
      Coll.set(setObj, path, 'bar');
      expect(setObj.data[1] === 'bar').toBe(true);
    });
    it('should set a deeply nested value on an object', () => {
      const setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.bar';
      Coll.set(setObj, path, 'test');
      expect(setObj.data[0].bar === 'test').toBe(true);
    });
    it('should return the original object', () => {
      const setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.bar';
      const res = Coll.set(setObj, path, 'test');
      expect(setObj === res).toBe(true);
    });
  });
  describe('unset', () => {
    it('should remove a value from an object', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0';
      Coll.unset(getObj, path);
      expect(getObj.data[0] === undefined).toBe(true);
    });
    it('should remove a value from an deeply nested object', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.foo';
      Coll.unset(getObj, path);
      expect(getObj.data[0].foo === undefined).toBe(true);
    });
    it('should return true if the value was removed', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.foo';
      const res = Coll.unset(getObj, path);
      expect(res).toBe(true);
    });
  });
});