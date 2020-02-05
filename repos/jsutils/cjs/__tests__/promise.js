'use strict';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const _require = require('../promise'),
      promisifyAll = _require.promisifyAll;

const inputA = 'testA';
const inputB = 'testB';

const _testPromisification =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (object) {
    promisifyAll(object);
    expect(object.someFuncAsync).not.toEqual(undefined);
    expect(object.someOtherFuncAsync).not.toEqual(undefined);
    const resultA = yield object.someFuncAsync(inputA);
    const resultB = yield object.someOtherFuncAsync(inputB);
    expect(resultA).toEqual(inputA);
    expect(resultB).toEqual(inputB);
  });

  return function _testPromisification(_x) {
    return _ref.apply(this, arguments);
  };
}();

const getClsObj = type => {
  class MyClass {
    someFunc(input, callback) {
      return callback && callback(null, input) || input;
    }

    someOtherFunc(input, callback) {
      return callback && callback(null, input) || input;
    }

  }

  const object = {
    someFunc(input, callback) {
      return callback && callback(null, input) || input;
    },

    someOtherFunc(input, callback) {
      return callback && callback(null, input) || input;
    }

  };
  return type === 'obj' ? _objectSpread({}, object) : type === 'class' ? MyClass : new MyClass();
};

describe('/promise', () => {
  describe('promisifyAll', () => {
    beforeEach(() => jest.resetAllMocks());
    it('should promisify all functions defined on an object',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield _testPromisification(getClsObj('obj'));
    }));
    it("should promisify all functions defined on an object's prototype",
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      yield _testPromisification(getClsObj());
    }));
    it('should not promisify any functions on the default object prototype', () => {
      const NewClass = promisifyAll(getClsObj('class').prototype);
      const propertyNames = Object.getOwnPropertyNames(Object.prototype);

      for (const key in Object.getPrototypeOf(NewClass)) {
        const asyncName = key + 'Async';
        expect(propertyNames.indexOf(asyncName)).toEqual(-1);
      }
    });
    it('should promisify all functions defined on an objects prototype',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      const MyClass = getClsObj('class');
      promisifyAll(MyClass.prototype);
      const instance = new MyClass();
      const input = 'input';
      const result = yield instance.someFuncAsync(input);
      expect(result).toEqual(input);
    }));
    it('should promisify objects getter function properties ',
    /*#__PURE__*/
    _asyncToGenerator(function* () {
      const propertyName = 'someProperty';
      const testObject = {
        someOtherProperty: false,

        someFunc(input, callback) {
          return callback && callback(null, input) || input;
        }

      };
      Object.defineProperty(testObject, propertyName, {
        get: (input, callback) => {
          return callback && callback(null, input) || input;
        }
      });
      promisifyAll(testObject);
      const input = 'input';
      const result = yield testObject.somePropertyAsync(input);
      expect(result).toEqual(input);
    }));
  });
});