"use strict";

require("core-js/modules/es.array.index-of");

const Obj = require('../object');

describe('/object', () => {
  beforeEach(() => jest.resetAllMocks());
  describe('cloneJson', () => {
    it('should clone the passed in object, and its children', () => {
      const obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      const clone = Obj.cloneJson(obj);
      expect(typeof clone).toEqual('object');
      expect(clone === obj).toEqual(false);
      expect(clone.sub === obj.sub).toEqual(false);
    });
    it('should call console.error and not throw on invalid json Object', () => {
      const consoleErr = console.error;
      console.error = jest.fn();
      const obj = {
        test: 'I am a string'
      };
      const obj2 = {
        obj: obj,
        data: 'some data'
      };
      obj.obj2 = obj2;
      const clone = Obj.cloneJson(obj);
      expect(console.error).toHaveBeenCalled();
      expect(clone).toEqual(null);
      console.error = consoleErr;
    });
  });
  describe('clearObj', () => {
    it('should remove all props from an object', () => {
      const obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      Obj.clearObj(obj);
      expect('test' in obj).toEqual(false);
      expect('sub' in obj).toEqual(false);
    });
    it('should not remove filtered props', () => {
      const obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      Obj.clearObj(obj, ['sub']);
      expect('test' in obj).toEqual(false);
      expect('sub' in obj).toEqual(true);
    });
  });
  describe('isObj', () => {
    it('should test if data is an object', () => {
      const obj = {
        test: 'I am a string',
        sub: [1, 2, 3]
      };
      expect(Obj.isObj(obj)).toEqual(true);
    });
    it('should return false if data is an array', () => {
      const obj = [1, 2, 3];
      expect(Obj.isObj(obj)).toEqual(false);
    });
  });
  describe('deepMerge', () => {
    it('should merge objects together into new object', () => {
      const obj1 = {
        test: 'I am a obj 1',
        sub: [1, 2, 3]
      };
      const obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      const obj3 = Obj.deepMerge(obj1, obj2);
      expect(obj3).not.toEqual(obj1);
      expect(obj3).not.toEqual(obj2);
      expect(obj3.test).toEqual('I am a obj 2');
      expect(obj3.sub.indexOf(1)).toEqual(0);
      expect(obj3.sub.indexOf(4)).toEqual(3);
    });
    it('should handel non-objects passed in as a param', () => {
      const obj1 = {
        test: 'I am a obj 1',
        sub: [1, 2, 3]
      };
      const obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      const obj3 = Obj.deepMerge(obj1, "I am not an object", obj2);
      expect(obj3).not.toEqual(obj1);
      expect(obj3).not.toEqual(obj2);
      expect(obj3.test).toEqual('I am a obj 2');
      expect(obj3.sub.indexOf(1)).toEqual(0);
      expect(obj3.sub.indexOf(4)).toEqual(3);
    });
    it('should handel objects with functions', () => {
      const obj1 = {
        test: 'I am a obj 1',
        method: () => {}
      };
      const obj2 = {
        test: 'I am a obj 2',
        sub: [4, 5, 6]
      };
      const obj3 = Obj.deepMerge(obj1, obj2);
      expect('method' in obj3).toEqual(true);
      expect('sub' in obj3).toEqual(true);
    });
  });
  describe('deepFreeze', () => {
    it('should recursively freeze an object and its children', () => {
      const obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      Obj.deepFreeze(obj);
      expect(Object.isFrozen(obj)).toEqual(true);
      expect(Object.isFrozen(obj.data)).toEqual(true);
      expect(Object.isFrozen(obj.sub)).toEqual(true);
    });
  });
  describe('mapObj', () => {
    it('should call the callback on all object properties', () => {
      const obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      const keys = [];
      const callBack = jest.fn((key, value) => keys.push(key));
      Obj.mapObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
    it('should return array of values retured from the callback', () => {
      const obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      const callBack = jest.fn((key, value) => key);
      const keys = Obj.mapObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
  });
  describe('reduceObj', () => {
    it('should call the callback on all object properties', () => {
      const obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      const keys = [];
      const callBack = jest.fn((key, value, obj) => {
        keys.push(key);
        return obj;
      });
      Obj.reduceObj(obj, callBack);
      expect(keys.length).toEqual(3);
      expect(keys.indexOf('test')).not.toEqual(-1);
      expect(keys.indexOf('sub')).not.toEqual(-1);
      expect(keys.indexOf('data')).not.toEqual(-1);
      expect(callBack).toHaveBeenCalledTimes(3);
    });
    it('should return object from the last callback', () => {
      const obj = {
        test: 'I should freeze',
        sub: [1, 2, 3],
        data: {
          test: 'I should freeze'
        }
      };
      const callBack = jest.fn((key, value, obj) => {
        obj.called = obj.called || 0;
        obj.called += 1;
        return obj;
      });
      const reduceObj = Obj.reduceObj(obj, callBack);
      expect(typeof reduceObj).toEqual('object');
      expect(reduceObj.called).toEqual(3);
    });
  });
  describe('sanitizeCopy', () => {
    it('should strip html from object properties', () => {
      const dirtyObject = {
        name: 'Test name',
        text: '<p>This is the dirty string</p>'
      };
      const cleanText = '&lt;p&gt;This is the dirty string&lt;/p&gt;';
      const cleanObject = Obj.sanitizeCopy(dirtyObject);
      expect(cleanObject).not.toEqual(dirtyObject);
      expect(cleanObject.name).toEqual(dirtyObject.name);
      expect(cleanObject.text).toEqual(cleanText);
    });
  });
  describe('trimStringFields', () => {
    it('should trim all string fields of an object', () => {
      const testObj = {
        test: '   I am A strIng   ',
        data: [1, 2, 3, 4]
      };
      const trimmedObj = Obj.trimStringFields(testObj);
      expect(trimmedObj.test).toEqual('I am A strIng');
    });
    it('should not change non-string fields', () => {
      const testObj = {
        test: '   I am A strIng   ',
        data: [1, 2, 3, 4]
      };
      const trimmedObj = Obj.trimStringFields(testObj);
      expect(trimmedObj.data).toEqual(testObj.data);
    });
  });
});