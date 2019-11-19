"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-integer");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.is");

require("core-js/modules/es.object.is-frozen");

require("core-js/modules/es.object.is-sealed");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.seal");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.repeat");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Coll = require('../collection');

var _require = require('../array'),
    isArr = _require.isArr;

var _require2 = require('../object'),
    isObj = _require2.isObj;

describe('/collection', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  describe('get', function () {
    it('should NOT modify the traversed path upon failure', function () {
      var obj = {
        foo: 123,
        data: 'Hello'
      };
      var path = ['data', 'path2']; // path2 doesn't exist, should return fallback value

      expect(Coll.get(obj, path, 0) === 0).toBe(true); // traversed path should keep its value

      expect(obj.foo).toEqual(123);
      expect(obj.data).toEqual('Hello');
      var obj2 = {
        foo: 123,
        data: {
          count: 100
        }
      };
      var path2 = ['data', 'count', 'toes'];
      expect(Coll.get(obj2, path2, 0) === 0).toBe(true); // traversed path should keep its value

      expect(obj2.foo).toEqual(123);
      expect(obj2.data.count).toEqual(100);
    });
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
    it('should handle functions in the object path', function () {
      var foo = function foo() {};

      foo.boo = 'duper';
      var getObj = [{
        foo: foo
      }];
      var path = '0.foo.boo';
      expect(Coll.get(getObj, path) === 'duper').toBe(true);
    });
    it('should return a fallback when get value does not exist', function () {
      var getObj = {
        data: [{
          foo: 'duper'
        }]
      };
      var path = 'data.0.duper';
      expect(Coll.get(getObj, path, "deep_fallback") === 'deep_fallback').toBe(true);
    });
    it('should return a fallback when a value in the path does not exist', function () {
      var getObj = {
        data: [{
          exists: 'I Exist!'
        }]
      };
      var path = 'data.1.test';
      expect(Coll.get(getObj, path, "shallow_fallback") === 'shallow_fallback').toBe(true);
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
    describe('preserving the source types when cloning', function () {
      var Foo = function Foo() {
        _classCallCheck(this, Foo);
      };

      var testCases = [[[], isArr], [{}, isObj], [1, Number.isInteger], [new Foo(), function (x) {
        return x instanceof Foo;
      }], [new Date(), function (x) {
        return x instanceof Date;
      }], ["hi", function (x) {
        return typeof x === 'string';
      }]];
      testCases.map(function (_ref, idx) {
        var _ref2 = _slicedToArray(_ref, 2),
            source = _ref2[0],
            predicate = _ref2[1];

        it("should preserve the source type for test case ".concat(idx), function () {
          var clone = Coll.deepClone(source);
          expect(predicate(clone)).toBe(true);
        });
      });
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
    }), it('should make a sealed clone if the source is sealed', function () {
      var source = Object.seal({
        a: 1
      });
      var clone = Coll.deepClone(source);
      expect(Object.isSealed(clone)).toBe(true);
    });
  });
  describe('repeat', function () {
    it('should repeat the element the specified number of times', function () {
      var length = 5;
      var element = 1;
      var repeated = Coll.repeat(element, length);
      expect(repeated.length).toEqual(length);
      repeated.forEach(function (el) {
        return expect(el).toEqual(element);
      });
    });
    it('should work with functions as the element', function () {
      var element = 2;

      var func = function func() {
        return 2;
      };

      var length = 10;
      var repeated = Coll.repeat(func, length);
      expect(repeated.length).toEqual(length);
      repeated.forEach(function (el) {
        return expect(el).toEqual(element);
      });
    });
    it('should return an empty array if the times arg is <= 0', function () {
      expect(Coll.repeat(1, null)).toEqual([]);
      expect(Coll.repeat(1, 0)).toEqual([]);
      expect(Coll.repeat(1, -1)).toEqual([]);
    });
    it('should log errors and return an empty array if something other than a number is passed as times', function () {
      var orgError = console.error;
      console.error = jest.fn();
      expect(Coll.repeat(1, "hi")).toEqual([]);
      expect(console.error).toHaveBeenCalled();
      console.error = orgError;
    });
    it('should deeply clone elements if the flag is specified', function () {
      var element = {
        a: {
          b: 1
        }
      };
      var repeatedEl = Coll.repeat(element, 1, true)[0];
      expect(repeatedEl.a.b).toEqual(element.a.b);
      expect(Object.is(repeatedEl, element)).toBe(false);
      expect(Object.is(repeatedEl.a, element.a)).toBe(false);
    });
  });
  describe('shallowEqual', function () {
    it('should return true when the collections key values are the same', function () {
      var col1 = {
        foo: 'bar',
        baz: 1
      };
      var col2 = {
        foo: 'bar',
        baz: 1
      };
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return true when the collections are the same', function () {
      var col1 = {
        foo: 'bar',
        baz: 1
      };
      var col2 = col1;
      expect(col1 === col2).toEqual(true);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return true when the objects have the same keys but are not the same', function () {
      var col1 = {
        0: 'foo',
        1: 'bar'
      };
      var col2 = ['foo', 'bar'];
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(true);
    });
    it('should return false when the collections key values are NOT the same', function () {
      var col1 = {
        foo: 'bar',
        baz: []
      };
      var col2 = {
        foo: 'bar'
      };
      var col3 = {
        foo: 'bar',
        baz: []
      };
      var col4 = {
        foo: 'bar',
        baz: []
      };
      expect(col1 === col2).toEqual(false);
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(col3 === col4).toEqual(false);
      expect(Coll.shallowEqual(col3, col4)).toEqual(false);
    });
    it('should return false when either of the arguments is not a collection', function () {
      var col1 = {
        foo: 'bar',
        baz: 1
      };
      var col2 = 'FAIL';
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(Coll.shallowEqual(col2, col1)).toEqual(false);
    });
    it('should return false when either of the arguments dont exist', function () {
      var col1 = {
        foo: 'bar',
        baz: 1
      };
      var col2 = undefined;
      expect(Coll.shallowEqual(col1, col2)).toEqual(false);
      expect(Coll.shallowEqual(col2, col1)).toEqual(false);
    });
    it('should compare sub-keys when a path is passed as third argument', function () {
      var col1 = {
        foo: {
          bar: {
            baz: 'biz'
          }
        }
      };
      var col2 = {
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