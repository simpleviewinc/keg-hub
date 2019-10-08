"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Coll = require('../collection');

describe('/collection', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('get', function () {
    it('should get a value on an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data';
      expect(Coll.get(getObj, path) === getObj.data).toBe(true);
    });
    it('should get a deeply nested value on an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return undefined of the value is not found', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.duper';
      expect(Coll.get(getObj, path) === undefined).toBe(true);
    });
    it('should handle arrays as the root object', function () {
      var getObj = [{
        foo: 'duper'
      }];
      var path = '0.foo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return a fallback when get value does not exist', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.duper';
      expect(Coll.get(getObj, path, "fallback") === 'fallback').toBe(true);
    });
  });
  describe('isColl', function () {
    it('should check if the value is a collection', function () {
      expect(Coll.isColl({})).toBe(true);
      expect(Coll.isColl()).toBe(false);
      expect(Coll.isColl([])).toBe(true);
      expect(Coll.isColl(function () {})).toBe(false);
      expect(Coll.isColl(1)).toBe(false);
      expect(Coll.isColl('')).toBe(false);
      expect(Coll.isColl(null)).toBe(false);
      expect(Coll.isColl(NaN)).toBe(false);
    });
  });
  describe('isEmptyColl', function () {
    it('should check if an object is empty', function () {
      var notEmpty = {
        data: [{
          foo: 'duper'
        }]
      };
      var empty = {};
      expect(Coll.isEmptyColl(notEmpty)).toBe(false);
      expect(Coll.isEmptyColl(empty)).toBe(true);
    });
    it('should handle arrays, and not throw an error', function () {
      var notEmpty = [1, 2, 3];
      var empty = [];
      expect(Coll.isEmptyColl(notEmpty)).toBe(false);
      expect(Coll.isEmptyColl(empty)).toBe(true);
    });
  });
  describe('mapColl', function () {
    it('should loop over a collection of items', function () {
      var counter = 0;
      var res = Coll.mapColl([1, 2, 3, 4], function () {
        counter++;
        return counter;
      });
      expect(counter).toBe(4);
      expect(Array.isArray(res)).toBe(true);
    });
    it('should return as array when an object is passed in', function () {
      var counter = 0;
      var res = Coll.mapColl({
        1: 1,
        2: 2,
        3: 3
      }, function (key, value, coll) {
        counter++;
        return counter;
      });
      expect(counter).toBe(3);
      expect(Array.isArray(res)).toBe(true);
      expect(_typeof(res) === 'object').toBe(true);
    });
  });
  describe('reduceColl', function () {
    it('should loop over a collection of items', function () {
      var counter = 0;
      var res = Coll.reduceColl([1, 2, 3, 4], function (key, value, org, reduced) {
        counter++;
        return counter;
      }, 0);
      expect(counter).toBe(4);
      expect(counter === res).toBe(true);
    });
    it('should return a reduced value', function () {
      var counter = 0;
      var res = Coll.reduceColl([1, 2, 3, 4], function (key, value, org, reduced) {
        counter++;
        reduced[value] = counter;
        return reduced;
      }, {});
      expect(counter).toBe(4);
      expect(_typeof(res) === 'object').toBe(true);
      expect(Object.keys(res).length === 4).toBe(true);
    });
  });
  describe('set', function () {
    it('should set a value on an object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.1';
      Coll.set(setObj, path, 'bar');
      expect(setObj.data[1] === 'bar').toBe(true);
    });
    it('should set a deeply nested value on an object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.bar';
      Coll.set(setObj, path, 'test');
      expect(setObj.data[0].bar === 'test').toBe(true);
    });
    it('should return the original object', function () {
      var setObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.bar';
      var res = Coll.set(setObj, path, 'test');
      expect(setObj === res).toBe(true);
    });
  });
  describe('unset', function () {
    it('should remove a value from an object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0';
      Coll.unset(getObj, path);
      expect(getObj.data[0] === undefined).toBe(true);
    });
    it('should remove a value from an deeply nested object', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      Coll.unset(getObj, path);
      expect(getObj.data[0].foo === undefined).toBe(true);
    });
    it('should return true if the value was removed', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.foo';
      var res = Coll.unset(getObj, path);
      expect(res).toBe(true);
    });
  });
  describe('deepClone', function () {
    it('should create a copy of the passed in object collection', function () {
      var org = {
        foo: 'bar'
      };
      var clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(Object.keys(clone).length).toEqual(1);
      expect(clone.foo).toEqual('bar');
    });
    it('should create a copy of the passed in array collection', function () {
      var org = ['foo', 'bar'];
      var clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(clone.length).toEqual(2);
      expect(clone[0]).toEqual('foo');
      expect(clone[1]).toEqual('bar');
    });
    it('should create a deep copy of the passed in object collection', function () {
      var org = {
        foo: {
          bar: 'baz'
        }
      };
      var clone = Coll.deepClone(org);
      expect(clone === org).toEqual(false);
      expect(clone.foo === org.foo).toEqual(false);
      expect(clone.foo.bar).toEqual('baz');
    });
    it('should create a deep copy of the passed in array collection', function () {
      var org = [['foo', 'baz'], ['bar']];
      var clone = Coll.deepClone(org);
      expect(clone[0] === org[0]).toEqual(false);
      expect(clone[1] === org[1]).toEqual(false);
      expect(clone.length).toEqual(2);
      expect(clone[0][0]).toEqual('foo');
      expect(clone[1][0]).toEqual('bar');
    });
    it('should create a deep copy of the passed in object with arrays with objects', function () {
      var org = {
        das: [{
          bar: ['foo', 'baz']
        }]
      };
      var clone = Coll.deepClone(org);
      expect(clone.das === org.das).toEqual(false);
      expect(clone.das[0] === org.das[0]).toEqual(false);
      expect(clone.das[0].bar === org.das[0].bar).toEqual(false);
      expect(clone.das[0].bar[0]).toEqual('foo');
      expect(clone.das[0].bar[1]).toEqual('baz');
    });
    it('should make a frozen clone if the source is frozen', function () {
      var source = Object.freeze({
        a: 1
      });
      var clone = Coll.deepClone(source);
      expect(Object.isFrozen(clone)).toBe(true);
    });
    it('should preserve all properties from an object created using a constructor', function () {
      var TestObject = function TestObject(a) {
        _classCallCheck(this, TestObject);

        this.a = a;
      };

      var source = new TestObject(1);
      var clone = Coll.deepClone(source);
      expect(clone.a).toEqual(source.a);
    });
    it('should preserve the prototype', function () {
      var Foo = function Foo() {
        _classCallCheck(this, Foo);
      };

      var Bar =
      /*#__PURE__*/
      function (_Foo) {
        _inherits(Bar, _Foo);

        function Bar() {
          _classCallCheck(this, Bar);

          return _possibleConstructorReturn(this, _getPrototypeOf(Bar).apply(this, arguments));
        }

        return Bar;
      }(Foo);

      var source = new Bar();
      var clone = Coll.deepClone(source);
      expect(Object.getPrototypeOf(clone)).toEqual(Object.getPrototypeOf(source));
    });
  });
});