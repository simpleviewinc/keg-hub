const Obj = require('../')

describe('deepMerge', () => {

  beforeEach(() => jest.resetAllMocks())

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