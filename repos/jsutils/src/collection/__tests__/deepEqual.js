const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')


describe('deepEqual', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return true if two objects are equal', () => {

    const test1 = { foo: { test: 'bar' } }
    const test2 = { foo: { test: 'bar' } }

    expect(test1 === test2).toEqual(false)
    expect(Coll.deepEqual(test1, test2)).toEqual(true)

  })

  it('should return false if two objects are not equal', () => {

    const test1 = { foo: { test: 'bar', num: 2 } }
    const test2 = { foo: { test: 'bar' } }

    expect(test1 === test2).toEqual(false)
    expect(Coll.deepEqual(test1, test2)).toEqual(false)

  })

  it('should work with arrays', () => {

    const test1 = [ { foo: { test: 'bar' } } ]
    const test2 = [ { foo: { test: 'bar' } } ]

    expect(test1 === test2).toEqual(false)
    expect(Coll.deepEqual(test1, test2)).toEqual(true)

    const test3 = [[ { foo: { test: 'bar' } } ]]
    const test4 = [[[ { foo: { test: 'bar' } } ]]]

    expect(test3 === test4).toEqual(false)
    expect(Coll.deepEqual(test3, test4)).toEqual(false)

  })

  it('should work with deeply nested mixed objects and arrays', () => {

    const test1 = { foo: [ { test: [ { baz: [ [ 'bar' ] ] } ] } ] }
    const test2 = { foo: [ { test: [ { baz: [ [ 'bar' ] ] } ] } ] }

    expect(test1 === test2).toEqual(false)
    expect(Coll.deepEqual(test1, test2)).toEqual(true)

  })

})
