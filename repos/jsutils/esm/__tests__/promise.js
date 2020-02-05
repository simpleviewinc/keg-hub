'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

require("regenerator-runtime/runtime");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../promise'),
    promisifyAll = _require.promisifyAll;

var inputA = 'testA';
var inputB = 'testB';

var _testPromisification =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(object) {
    var resultA, resultB;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promisifyAll(object);
            expect(object.someFuncAsync).not.toEqual(undefined);
            expect(object.someOtherFuncAsync).not.toEqual(undefined);
            _context.next = 5;
            return object.someFuncAsync(inputA);

          case 5:
            resultA = _context.sent;
            _context.next = 8;
            return object.someOtherFuncAsync(inputB);

          case 8:
            resultB = _context.sent;
            expect(resultA).toEqual(inputA);
            expect(resultB).toEqual(inputB);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _testPromisification(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getClsObj = function getClsObj(type) {
  var MyClass =
  /*#__PURE__*/
  function () {
    function MyClass() {
      _classCallCheck(this, MyClass);
    }

    _createClass(MyClass, [{
      key: "someFunc",
      value: function someFunc(input, callback) {
        return callback && callback(null, input) || input;
      }
    }, {
      key: "someOtherFunc",
      value: function someOtherFunc(input, callback) {
        return callback && callback(null, input) || input;
      }
    }]);

    return MyClass;
  }();

  var object = {
    someFunc: function someFunc(input, callback) {
      return callback && callback(null, input) || input;
    },
    someOtherFunc: function someOtherFunc(input, callback) {
      return callback && callback(null, input) || input;
    }
  };
  return type === 'obj' ? _objectSpread({}, object) : type === 'class' ? MyClass : new MyClass();
};

describe('/promise', function () {
  describe('promisifyAll', function () {
    beforeEach(function () {
      return jest.resetAllMocks();
    });
    it('should promisify all functions defined on an object',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _testPromisification(getClsObj('obj'));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should promisify all functions defined on an object's prototype",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _testPromisification(getClsObj());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should not promisify any functions on the default object prototype', function () {
      var NewClass = promisifyAll(getClsObj('class').prototype);
      var propertyNames = Object.getOwnPropertyNames(Object.prototype);

      for (var key in Object.getPrototypeOf(NewClass)) {
        var asyncName = key + 'Async';
        expect(propertyNames.indexOf(asyncName)).toEqual(-1);
      }
    });
    it('should promisify all functions defined on an objects prototype',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var MyClass, instance, input, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              MyClass = getClsObj('class');
              promisifyAll(MyClass.prototype);
              instance = new MyClass();
              input = 'input';
              _context4.next = 6;
              return instance.someFuncAsync(input);

            case 6:
              result = _context4.sent;
              expect(result).toEqual(input);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should promisify objects getter function properties ',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var propertyName, testObject, input, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              propertyName = 'someProperty';
              testObject = {
                someOtherProperty: false,
                someFunc: function someFunc(input, callback) {
                  return callback && callback(null, input) || input;
                }
              };
              Object.defineProperty(testObject, propertyName, {
                get: function get(input, callback) {
                  return callback && callback(null, input) || input;
                }
              });
              promisifyAll(testObject);
              input = 'input';
              _context5.next = 7;
              return testObject.somePropertyAsync(input);

            case 7:
              result = _context5.sent;
              expect(result).toEqual(input);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});