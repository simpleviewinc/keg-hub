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
    someFunc(input, callback){
      return callback && callback(null, input) || input
    }
    someOtherFunc(input, callback){
      return callback && callback(null, input) || input
    }
  }
  const object = {
    someFunc(input, callback){
      return callback && callback(null, input) || input
    },
    someOtherFunc(input, callback){
      return callback && callback(null, input) || input
    }
  }

  return type === 'obj'
    ? { ...object }
    : type === 'class'
      ? MyClass
      : new MyClass()
}

describe('/promise', () => {
  describe('promisifyAll', () => {
    
    beforeEach(() => jest.resetAllMocks())
    
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

    it('should promisify objects getter function properties ', async () => {
      const propertyName = 'someProperty'
      const testObject = {
        someOtherProperty: false,
        someFunc(input, callback) {
          return callback && callback(null, input) || input
        }
      }

      Object.defineProperty(testObject, propertyName, {
        get: (input, callback) => {
          return callback && callback(null, input) || input
        }
      })

      promisifyAll(testObject)
      const input = 'input'
      const result = await testObject.somePropertyAsync(input)

      expect(result).toEqual(input)
    })

  })
})
