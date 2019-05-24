'use strict'

const { promisifyAll } = require('../promise')
const inputA = 'testA'
const inputB = 'testB'
const _testPromisification = async object => {
  promisifyAll(object)

  expect(object.someFuncAsync).not.toEqual(undefined)
  expect(object.someOtherFuncAsync).not.toEqual(undefined)

  const resultA = await object.someFuncAsync(inputA)
  const resultB = await object.someOtherFuncAsync(inputB)

  expect(resultA).toEqual(inputA)
  expect(resultB).toEqual(inputB)
}
const getClsObj = type => {
  class MyClass {

    someFunc(input, callback) {
      callback(null, input)
    }
    someOtherFunc(input, callback) {
      callback(null, input)
    }

  }
  const object = {
    someFunc(input, callback) {
      callback(null, input)
    },
    someOtherFunc(input, callback) {
      callback(null, input)
    }
  }

  return type === 'obj'
    ? Object.assign({}, object)
    : type === 'class'
      ? MyClass
      : new MyClass()
}

describe('/promise', () => {
  describe('promisifyAll', () => {
    it('should promisify all functions defined on an object', async () => {
      await _testPromisification(getClsObj('obj'))
    })

    it("should promisify all functions defined on an object's prototype", async () => {
      await _testPromisification(getClsObj())
    })

    it('should not promisify any functions on the default object prototype', () => {
      const NewClass = promisifyAll(getClsObj('class').prototype)
      const propertyNames = Object.getOwnPropertyNames(Object.prototype)

      for (const key in Object.getPrototypeOf(NewClass)) {
        const asyncName = key + 'Async'
        expect(propertyNames.indexOf(asyncName)).toEqual(-1)
      }
    })

    it('should promisify all functions defined on an objects prototype', async () => {
      const MyClass = getClsObj('class')
      promisifyAll(MyClass.prototype)
      const instance = new MyClass()
      const input = 'input'
      const result = await instance.someFuncAsync(input)

      expect(result).toEqual(input)
    })

    it('should be able to promisify objects that contain properties with getter functions', async () => {
      const propertyName = 'someProperty'
      const testObject = {
        someOtherProperty: false,
        someFunc(input, callback) {
          callback(null, input)
        }
      }

      Object.defineProperty(testObject, propertyName, {
        get: function() {
          throw new Error('Should not triggered')
        }
      })

      promisifyAll(testObject)
      const input = 'input'
      const result = await testObject.someFuncAsync(input)

      expect(result).toEqual(input)
    })
  })
})
