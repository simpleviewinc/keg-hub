"use strict";

const Coll = require('../collection');

const _require = require('../array'),
      isArr = _require.isArr;

const _require2 = require('../object'),
      isObj = _require2.isObj;

describe('/collection', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('get', () => {
    it('should NOT modify the traversed path upon failure', () => {
      const obj = {
        foo: 123,
        data: 'Hello'
      };
      const path = ['data', 'path2']; // path2 doesn't exist, should return fallback value

      expect(Coll.get(obj, path, 0) === 0).toBe(true); // traversed path should keep its value

      expect(obj.foo).toEqual(123);
      expect(obj.data).toEqual('Hello');
      const obj2 = {
        foo: 123,
        data: {
          count: 100
        }
      };
      const path2 = ['data', 'count', 'toes'];
      expect(Coll.get(obj2, path2, 0) === 0).toBe(true); // traversed path should keep its value

      expect(obj2.foo).toEqual(123);
      expect(obj2.data.count).toEqual(100);
    });
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
    it('should handle functions in the object path', () => {
      const foo = () => {};

      foo.boo = 'duper';
      const getObj = [{
        foo
      }];
      const path = '0.foo.boo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return a fallback when get value does not exist', () => {
      const getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      const path = 'data.0.duper';
      expect(Coll.get(getObj, path, "deep_fallback") === 'deep_fallback').toBe(true);
    });
    it('should return a fallback when a value in the path does not exist', () => {
      const getObj = {
        data: [{
          exists: 'I Exist!'
        }]
      };
      const path = 'data.1.test';
      expect(Coll.get(getObj, path, "shallow_fallback") === 'shallow_fallback').toBe(true);
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
  describe('isEmptyColl', () => {
    it('should check if an object is empty', () => {
      const notEmpty = {
        data: [{
          foo: 'duper'
        }]
      };
      const empty = {};
      expect(Coll.isEmptyColl(notEmpty)).toBe(false);
      expect(Coll.isEmptyColl(empty)).toBe(true);
    });
    it('should handle arrays, and not throw an error', () => {
      const notEmpty = [1, 2, 3];
      const empty = [];
      expect(Coll.isEmptyColl(notEmpty)).toBe(false);
      expect(Coll.isEmptyColl(empty)).toBe(true);
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
  describe('deepClone', () => {
    it('should create a copy of the passed in object collection', () => {
      const org = {
        foo: 'bar'
      };
      const clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(Object.keys(clone).length).toEqual(1);
      expect(clone.foo).toEqual('bar');
    });
    it('should create a copy of the passed in array collection', () => {
      const org = ['foo', 'bar'];
      const clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(clone.length).toEqual(2);
      expect(clone[0]).toEqual('foo');
      expect(clone[1]).toEqual('bar');
    });
    describe('preserving the source types when cloning', () => {
      class Foo {}

      const testCases = [[[], isArr], [{}, isObj], [1, Number.isInteger], [new Foo(), x => x instanceof Foo], [new Date(), x => x instanceof Date], ["hi", x => typeof x === 'string']];
      testCases.map(([source, predicate], idx) => {
        it(`should preserve the source type for test case ${idx}`, () => {
          const clone = Coll.deepClone(source);
          expect(predicate(clone)).toBe(true);
        });
      });
    });
    it('should create a deep copy of the passed in object collection', () => {
      const org = {
        foo: {
          bar: 'baz'
        }
      };
      const clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(clone.foo === org.foo).toEqual(false);
      expect(clone.foo.bar).toEqual('baz');
    });
    it('should create a deep copy of the passed in array collection', () => {
      const org = [['foo', 'baz'], ['bar']];
      const clone = Coll.deepClone(org);
      expect(clone[0] === org[0]).toEqual(false);
      expect(clone[1] === org[1]).toEqual(false);
      expect(clone.length).toEqual(2);
      expect(clone[0][0]).toEqual('foo');
      expect(clone[1][0]).toEqual('bar');
    });
    it('should create a deep copy of the passed in object with arrays with objects', () => {
      const org = {
        das: [{
          bar: ['foo', 'baz']
        }]
      };
      const clone = Coll.deepClone(org);
      expect(clone.das === org.das).toEqual(false);
      expect(clone.das[0] === org.das[0]).toEqual(false);
      expect(clone.das[0].bar === org.das[0].bar).toEqual(false);
      expect(clone.das[0].bar[0]).toEqual('foo');
      expect(clone.das[0].bar[1]).toEqual('baz');
    });
    it('should make a frozen clone if the source is frozen', () => {
      const source = Object.freeze({
        a: 1
      });
      const clone = Coll.deepClone(source);
      expect(Object.isFrozen(clone)).toBe(true);
    });
    it('should preserve all properties from an object created using a constructor', () => {
      class TestObject {
        constructor(a) {
          this.a = a;
        }

      }

      const source = new TestObject(1);
      const clone = Coll.deepClone(source);
      expect(clone.a).toEqual(source.a);
    });
    it('should preserve the prototype', () => {
      class Foo {}

      class Bar extends Foo {}

      const source = new Bar();
      const clone = Coll.deepClone(source);
      expect(Object.getPrototypeOf(clone)).toEqual(Object.getPrototypeOf(source));
    }), it('should make a sealed clone if the source is sealed', () => {
      const source = Object.seal({
        a: 1
      });
      const clone = Coll.deepClone(source);
      expect(Object.isSealed(clone)).toBe(true);
    });
  });
  describe('repeat', () => {
    it('should repeat the element the specified number of times', () => {
      const length = 5;
      const element = 1;
      const repeated = Coll.repeat(element, length);
      expect(repeated.length).toEqual(length);
      repeated.forEach(el => expect(el).toEqual(element));
    });
    it('should work with functions as the element', () => {
      const element = 2;

      const func = () => 2;

      const length = 10;
      const repeated = Coll.repeat(func, length);
      expect(repeated.length).toEqual(length);
      repeated.forEach(el => expect(el).toEqual(element));
    });
    it('should return an empty array if the times arg is <= 0', () => {
      expect(Coll.repeat(1, null)).toEqual([]);
      expect(Coll.repeat(1, 0)).toEqual([]);
      expect(Coll.repeat(1, -1)).toEqual([]);
    });
    it('should log errors and return an empty array if something other than a number is passed as times', () => {
      const orgError = console.error;
      console.error = jest.fn();
      expect(Coll.repeat(1, "hi")).toEqual([]);
      expect(console.error).toHaveBeenCalled();
      console.error = orgError;
    });
    it('should deeply clone elements if the flag is specified', () => {
      const element = {
        a: {
          b: 1
        }
      };
      const repeatedEl = Coll.repeat(element, 1, true)[0];
      expect(repeatedEl.a.b).toEqual(element.a.b);
      expect(Object.is(repeatedEl, element)).toBe(false);
      expect(Object.is(repeatedEl.a, element.a)).toBe(false);
    });
  });
  describe('shallowEqual', () => {
    it('should return true when the collections key values are the same', () => {
      const col1 = {
        foo: 'bar',
        baz: 1
      };
      const col2 = {
        foo: 'bar',
        baz: 1
      };
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return true when the collections are the same', () => {
      const col1 = {
        foo: 'bar',
        baz: 1
      };
      const col2 = col1;
      expect(col1 === col2).toEqual(true);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return true when the objects have the same keys but are not the same', () => {
      const col1 = {
        0: 'foo',
        1: 'bar'
      };
      const col2 = ['foo', 'bar'];
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return false when the collections key values are NOT the same', () => {
      const col1 = {
        foo: 'bar',
        baz: []
      };
      const col2 = {
        foo: 'bar'
      };
      const col3 = {
        foo: 'bar',
        baz: []
      };
      const col4 = {
        foo: 'bar',
        baz: []
      };
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(col3 === col4).toEqual(false);
      expect(Coll.shallowEqual(col3, col4)).toEqual(false);
    });
    it('should return false when either of the arguments is not a collection', () => {
      const col1 = {
        foo: 'bar',
        baz: 1
      };
      const col2 = 'FAIL';
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(Coll.shallowEqual(col2, col1)).toEqual(false);
    });
    it('should return false when either of the arguments dont exist', () => {
      const col1 = {
        foo: 'bar',
        baz: 1
      };
      const col2 = undefined;
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(Coll.shallowEqual(col2, col1)).toEqual(false);
    });
    it('should compare sub-keys when a path is passed as third argument', () => {
      const col1 = {
        foo: {
          bar: {
            baz: 'biz'
          }
        }
      };
      const col2 = {
        foo: {
          bar: {
            baz: 'biz'
          }
        }
      };
      expect(col1 === col2).toEqual(false); // Should fail with no path

      expect(Coll.shallowEqual(col1, col2)).toEqual(false); // Pass in the path, to compare sub-key object

      expect(Coll.shallowEqual(col1, col2, 'foo.bar')).toEqual(true);
    });
  });
});