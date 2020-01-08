const Obj = require('../object')
const { isArr } = require('../array')
const { snakeCase } = require('../string')

describe('/object', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('cloneJson', () => {
    
    it('should clone the passed in object, and its children', () => {
      const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
      const clone = Obj.cloneJson(obj)

      expect(typeof clone).toEqual('object')
      expect(clone === obj).toEqual(false)
      expect(clone.sub === obj.sub).toEqual(false)
    })

    it('should call console.error and not throw on invalid json Object', () => {
      const consoleErr = console.error
      console.error = jest.fn()
      const obj = { test: 'I am a string' }
      const obj2 = { obj: obj, data: 'some data' }
      obj.obj2 = obj2
      const clone = Obj.cloneJson(obj)
      
      expect(console.error).toHaveBeenCalled()
      expect(clone).toEqual(null)
      console.error = consoleErr
    })
    
  })

  describe('clearObj', () => {

    it('should remove all props from an object', () => {
      const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
      Obj.clearObj(obj)

      expect('test' in obj).toEqual(false)
      expect('sub' in obj).toEqual(false)
    })

    it('should not remove filtered props', () => {
      const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
      Obj.clearObj(obj, [ 'sub' ])

      expect('test' in obj).toEqual(false)
      expect('sub' in obj).toEqual(true)
    })

  })

  describe('isObj', () => {

    it('should test if data is an object', () => {
      const obj = { test: 'I am a string', sub: [ 1, 2, 3 ] }
      expect(Obj.isObj(obj)).toEqual(true)
    })

    it('should return false if data is an array', () => {
      const obj = [ 1, 2, 3 ]
      expect(Obj.isObj(obj)).toEqual(false)
    })

  })

  describe('deepMerge', () => {

    it('should merge objects together into new object', () => {
      const obj1 = { test: 'I am a obj 1', sub: [ 1, 2, 3 ] }
      const obj2 = { test: 'I am a obj 2', sub: [ 4, 5, 6 ] }
      const obj3 = Obj.deepMerge(obj1, obj2)
      

      expect(obj3).not.toEqual(obj1)
      expect(obj3).not.toEqual(obj2)
      expect(obj3.test).toEqual('I am a obj 2')
      expect(obj3.sub.indexOf(1)).toEqual(0)
      expect(obj3.sub.indexOf(4)).toEqual(3)
    })

    it('should merge child objects together into new object', () => {

      const childObj = { arr: [ 'data' ], obj: { foo: 'bar' } }
      const childObj2 = { bas: 'baz' }
      const obj1 = { test: 'I am a obj 1', sub: [ childObj, 1, 2, 3 ] }
      const obj2 = { test: 'I am a obj 2', sub: [ childObj2, 4, 5, 6 ] }

      expect(obj1.sub.indexOf(childObj)).toBe(0)
      expect(obj1.sub[0].arr).toBe(childObj.arr)
      expect(obj1.sub[0].obj).toBe(childObj.obj)
      expect(obj2.sub.indexOf(childObj2)).toBe(0)

      const obj3 = Obj.deepMerge(obj1, obj2)

      expect(obj3.sub.indexOf(childObj)).toBe(-1)
      expect(obj3.sub.indexOf(childObj2)).toBe(-1)

      expect(Array.isArray(obj3.sub[0].arr)).toBe(true)
      expect(obj3.sub[0].arr).not.toBe(childObj.arr)
      expect(obj3.sub[0].arr[0]).toBe(childObj.arr[0])

      expect(typeof obj3.sub[0].obj).toBe('object')
      expect(obj3.sub[0].obj).not.toBe(childObj.obj)
      expect(obj3.sub[0].obj.foo).toBe(childObj.obj.foo)

      expect(obj3.sub[4].bas).toBe('baz')

      const subObj = { data: 'foo' }
      const arr1 = [ subObj ]
      const arr2 = [ arr1 ]
      const arr3 = [ arr2 ]
      const arr4 = []

      expect(arr3[0]).toBe(arr2)
      expect(arr2[0]).toBe(arr1)
      expect(arr1[0]).toBe(subObj)

      const arr5 = Obj.deepMerge(arr4, arr3)
      const arr3Copy = arr5
      const arr2Copy = arr5[0]
      const arr1Copy = arr5[0][0]
      const subObjCopy = arr5[0][0][0]

      expect(arr3Copy).not.toBe(arr3)
      expect(arr2Copy).not.toBe(arr2)
      expect(arr1Copy).not.toBe(arr1)
      expect(subObjCopy.data).toBe('foo')

    })

    it('should handel non-objects passed in as a param', () => {
      const obj1 = { test: 'I am a obj 1', sub: [ 1, 2, 3 ] }
      const obj2 = { test: 'I am a obj 2', sub: [ 4, 5, 6 ] }
      const obj3 = Obj.deepMerge(obj1, "I am not an object", obj2)

      expect(obj3).not.toEqual(obj1)
      expect(obj3).not.toEqual(obj2)
      expect(obj3.test).toEqual('I am a obj 2')
      expect(obj3.sub.indexOf(1)).toEqual(0)
      expect(obj3.sub.indexOf(4)).toEqual(3)
    })

    it('should handel objects with functions', () => {
      const obj1 = { test: 'I am a obj 1', method: () => {} }
      const obj2 = { test: 'I am a obj 2', sub: [ 4, 5, 6 ] }
      const obj3 = Obj.deepMerge(obj1, obj2)

      expect('method' in obj3).toEqual(true)
      expect('sub' in obj3).toEqual(true)
    })

  })

  describe('deepFreeze', () => {

    it('should recursively freeze an object and its children', () => {
      const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
      Obj.deepFreeze(obj)

      expect(Object.isFrozen(obj)).toEqual(true)
      expect(Object.isFrozen(obj.data)).toEqual(true)
      expect(Object.isFrozen(obj.sub)).toEqual(true)
    })

  })

  describe('mapObj', () => {

    it('should call the callback on all object properties', () => {
      const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
      const keys = []
      const callBack = jest.fn((key, value) => keys.push(key))
      Obj.mapObj(obj, callBack)

      expect(keys.length).toEqual(3)
      expect(keys.indexOf('test')).not.toEqual(-1)
      expect(keys.indexOf('sub')).not.toEqual(-1)
      expect(keys.indexOf('data')).not.toEqual(-1)
      expect(callBack).toHaveBeenCalledTimes(3)
    })

    it('should return array of values retured from the callback', () => {
      const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
      const callBack = jest.fn((key, value) => key)
      const keys = Obj.mapObj(obj, callBack)

      expect(keys.length).toEqual(3)
      expect(keys.indexOf('test')).not.toEqual(-1)
      expect(keys.indexOf('sub')).not.toEqual(-1)
      expect(keys.indexOf('data')).not.toEqual(-1)
      expect(callBack).toHaveBeenCalledTimes(3)
    })

  })
  
  describe('reduceObj', () => {

    it('should call the callback on all object properties', () => {
      const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
      const keys = []
      const callBack = jest.fn((key, value, obj) => {
        keys.push(key)
        return obj
      })

      Obj.reduceObj(obj, callBack)

      expect(keys.length).toEqual(3)
      expect(keys.indexOf('test')).not.toEqual(-1)
      expect(keys.indexOf('sub')).not.toEqual(-1)
      expect(keys.indexOf('data')).not.toEqual(-1)
      expect(callBack).toHaveBeenCalledTimes(3)
    })

    it('should return object from the last callback', () => {
      const obj = { test: 'I should freeze', sub: [ 1, 2, 3 ], data: { test: 'I should freeze' } }
      const callBack = jest.fn((key, value, obj) => {
        obj.called = obj.called || 0
        obj.called += 1

        return obj
      })
      const reduceObj = Obj.reduceObj(obj, callBack)

      expect(typeof reduceObj).toEqual('object')
      expect(reduceObj.called).toEqual(3)
    })

  })

  describe('sanitizeCopy', () => {

    it('should strip html from object properties', () => {
      const dirtyObject = {
        name: 'Test name',
        text: '<p>This is the dirty string</p>'
      }
      const cleanText = '&lt;p&gt;This is the dirty string&lt;/p&gt;'
      const cleanObject = Obj.sanitizeCopy(dirtyObject)

      expect(cleanObject).not.toEqual(dirtyObject)
      expect(cleanObject.name).toEqual(dirtyObject.name)
      expect(cleanObject.text).toEqual(cleanText)
    })
  })

  describe('trimStringFields', () => {

    it('should trim all string fields of an object', () => {
      const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
      const trimmedObj = Obj.trimStringFields(testObj)

      expect(trimmedObj.test).toEqual('I am A strIng')
    })

    it('should not change non-string fields', () => {
      const testObj = { test: '   I am A strIng   ', data: [ 1,2,3,4 ] }
      const trimmedObj = Obj.trimStringFields(testObj)

      expect(trimmedObj.data).toEqual(testObj.data)
    })

  })

  describe('omitKeys', () => {

    it('should return object without keys in passed in array', () => {
      const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
      const omitted = Obj.omitKeys(obj, [ 'data', 'sub' ])

      expect(omitted.sub).toEqual(undefined)
      expect(omitted.data).toEqual(undefined)
      expect(omitted.test).toEqual('I should exist')
    })

    it('should return empty object if first param is not an object', () => {
      const emptyObj = Obj.omitKeys('I am not an object', [])

      expect(Obj.isObj(emptyObj)).toBe(true)
      expect(Object.keys(emptyObj).length).toEqual(0)
    })

  })

  describe('pickKeys', () => {

    it('should return object with keys in passed in array', () => {
      const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
      const picked = Obj.pickKeys(obj, [ 'data', 'sub' ])

      expect(picked.sub).toEqual(obj.sub)
      expect(picked.data).toEqual(obj.data)
      expect(picked.test).toEqual(undefined)
    })

    it('should not add non-existing keys to the return object', () => {
      const obj = { test: 'I should exist', sub: [ 1, 2, 3 ], data: 'I should not exist' }
      const picked = Obj.pickKeys(obj, [ 'data', 'sub', 'duper' ])

      expect(picked.sub).toEqual(obj.sub)
      expect(picked.data).toEqual(obj.data)
      expect('duper' in picked).toEqual(false)
    })

    it('should return empty object if first param is not an object', () => {
      const emptyObj = Obj.pickKeys('I am not an object', [])

      expect(Obj.isObj(emptyObj)).toBe(true)
      expect(Object.keys(emptyObj).length).toEqual(0)
    })

  })

  describe('keyMap', () => {

    it('should return object with keys and values equal to values in array', () => {
      const arr = [ 'test', 'foo', 'bar', 'data', 'sub' ]
      const mapped = Obj.keyMap(arr)

      Obj.reduceObj(mapped, (key, value) => {
        expect(key).toEqual(value)
        expect(arr.indexOf(key)).not.toEqual(-1)
        expect(arr.indexOf(value)).not.toEqual(-1)
      })
    })

    it('should convert key and value to uppercase if second param is true', () => {
      const arr = [ 'test', 'foo', 'bar', 'data', 'sub' ]
      const mapped = Obj.keyMap(arr, true)

      arr.map(key => {
        expect(key.toUpperCase() in mapped).toEqual(true)
        expect(mapped[key.toUpperCase()]).toEqual(key.toUpperCase())
      })
    })

  })

  describe('applyToCloneOf', () => {

    it('should return a clone with the changes, leaving the original object unchanged', () => {
      const orig = {
        a: 1,
        b: 2
      }

      const result = Obj.applyToCloneOf(orig, (clone) => {
        clone.a = 42
      })

      expect(orig.a).toEqual(1)
      expect(result.a).toEqual(42)
      expect(result.b).toEqual(2)
    })

    it('should call console.warn on bad input', () => {
      const orgWarn = console.warn
      console.warn = jest.fn()

      Obj.applyToCloneOf(null, () => {})
      expect(console.warn).toHaveBeenCalled()
      console.warn.mockClear()
      
      Obj.applyToCloneOf(1, () => {})
      expect(console.warn).toHaveBeenCalled()
      console.warn.mockClear()
      
      Obj.applyToCloneOf({}, null)
      expect(console.warn).toHaveBeenCalled()
      console.warn.mockClear()
      
      Obj.applyToCloneOf({}, "I am not a function")
      expect(console.warn).toHaveBeenCalled()
      console.warn.mockClear()

      console.warn = orgWarn
    })

    it('should return the original object when on bad input', () => {
      const orgWarn = console.warn
      console.warn = jest.fn()
      
      const original = {}
      const notClone = Obj.applyToCloneOf(original, null)
      
      expect(console.warn).toHaveBeenCalled()
      expect(notClone === original).toEqual(true)

      console.warn = orgWarn
    })

    it('should work with delete', () => {
      const orig = {
        a: 1,
        b: 2
      }

      const updated = Obj.applyToCloneOf(orig, clone => {
        delete clone['a']
      })

      expect(updated.a).toEqual(undefined)
      expect(orig.a).toEqual(1)
    })

  })

  describe('everyEntry', () => {
    it('should work across an object\'s entries', () => {

      const foo = { a: 1, b: 2, c: 3}

      let result = Obj.everyEntry(foo, (k,v) => (v > 2))
      expect(result).toBe(false)

      result = Obj.everyEntry(foo, (k,v) => (v > 0))
      expect(result).toBe(true)
    })

    it('should log errors and return false if invalid input was passed', () => {
      const orgError = console.error
      const outputArr = []
      console.error = (output) => outputArr.push(output)

      const aString = "neither a function nor object"
      expect(Obj.everyEntry(null, () => {})).toEqual(false)
      expect(Obj.everyEntry({}, aString)).toEqual(false)
      expect(Obj.everyEntry(aString, () => {})).toEqual(false) 
      expect(outputArr.length).toEqual(3)

      console.error = orgError
    })
  })

  describe('someEntry', () => {
    it('should work across an object\'s entries', () => {
      const foo = { a: 1, b: 2, c: 3}

      let result = Obj.someEntry(foo, (k,v) => (v > 2))
      expect(result).toBe(true)

      result = Obj.someEntry(foo, (k,v) => (v > 4))
      expect(result).toBe(false)
    })

    it('should log errors and return false if invalid input was passed', () => {
      const orgError = console.error
      const outputArr = []
      console.error = (output) => outputArr.push(output)

      const aString = "neither a function nor object"
      expect(Obj.someEntry(null, () => {})).toEqual(false)
      expect(Obj.someEntry({}, aString)).toEqual(false)
      expect(Obj.someEntry(aString, () => {})).toEqual(false)
      expect(outputArr.length).toEqual(3)

      console.error = orgError
    })
  })

  describe('filterObj', () => {
    it('should work across an object\'s entries', () => {
      const foo = { a: 1, b: 2, c: 3 }

      let result = Obj.filterObj(foo, (k, v) => v > 2)
      expect(result.a).toBe(undefined)
      expect(result.b).toBe(undefined)
      expect(result.c).toBe(foo.c)
    })

    it('should log errors and return the obj argument if invalid input was passed', () => {
      const orgError = console.error
      const outputArr = []
      console.error = (output) => outputArr.push(output)

      const aString = "not an object"
      expect(Obj.filterObj(aString, () => {})).toEqual(aString)
      expect(Obj.filterObj({}, null)).toEqual({})
      expect(outputArr.length).toEqual(2)
      console.error = orgError
    })
  })

  describe('mapEntries', () => {
    it('should work with objects and return an object', () => {
      const obj = {a: 1, b: 2, c: 3}
      const expected = {a: 1, b: 4, c: 9}
      const result = Obj.mapEntries(obj, (key, val) => [key, val * val])
      expect(Obj.isObj(result)).toBe(true)
      expect(result).toEqual(expected)
    })
    
    it('should work with arrays and return an array', () => {
      const obj = [1, 2, 3]
      const expected = [1, 4, 9]
      const result = Obj.mapEntries(obj, (key, val) => [key, val * val])
      expect(isArr(result)).toBe(true)
      expect(result).toEqual(expected)
    })

    it("should log an error when the cb function does not return an entry", () => {
      const orgError = console.error
      console.error = jest.fn()

      const result = Obj.mapEntries({a: 1}, (key, value) => (value * 2))
      expect(console.error).toHaveBeenCalled()

      // it ignores any entries that don't return an entry when passed into the cb
      expect(result).toEqual({a: 1})
      console.error = orgError
    })

    it("can change keys", () => {
      const result = Obj.mapEntries({a: 1}, (key, value) => ['b', value])
      expect(result.b).toEqual(1)
      expect(result.a).toEqual(undefined)
    })

    it("should log an error and return the input if the input is invalid", () => {
      const orgError = console.error
      console.error = jest.fn()
      const result = Obj.mapEntries(1, () => {})
      expect(console.error).toHaveBeenCalled()
      expect(result).toEqual(1)

      console.error = jest.fn()
      const nextResult = Obj.mapEntries({})
      expect(console.error).toHaveBeenCalled()
      console.error = orgError
      expect(nextResult).toEqual({})
    })
  })

  describe("isEntry", () => {
    it("should return true if the input is an entry, false otherwise", () => {
      const cases = [
        [ [1, 2], true ],
        [ [1, 2, 3], false ],
        [ [1], false ],
        [ {}, false ],
        [ null, false ],
        [ [], false ],
      ]
      cases.map(([entry, expectedResult]) => {
        const result = Obj.isEntry(entry)
        expect(result).toBe(expectedResult)
      })
    })

    it("should check that the first element is number or string", () => {
        const cases = [
          [ ["id", 1], true ],
          [ [0, "value"], true ],
          [ [new Date(), "value"], false ],
          [ [true, "value"], false ],
        ]
        cases.map(([entry, expectedResult]) => {
          const result = Obj.isEntry(entry)
          expect(result).toBe(expectedResult)
        })
    })
  })

  describe('mapKeys', () => {
    it('should map all the keys of an object', () => {
      const obj = {
        'fooBar': 'wow',
        'PascalCase': 'whoa',
        'css-crap': 'hyphenated'
      }

      const result = Obj.mapKeys(obj, snakeCase)
      expect(result.foo_bar).toEqual(obj.fooBar)
      expect(result.pascal_case).toEqual(obj.PascalCase)
      expect(result.css_crap).toEqual(obj['css-crap'])
    })
  })
})