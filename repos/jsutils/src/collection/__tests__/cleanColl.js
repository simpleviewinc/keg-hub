const Coll = require('../')

describe('cleanColl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should remove undefined and null values from the collection', () => {

    const obj = { test: undefined, foo: null }
    const keys = Object.keys(obj)

    expect(keys.indexOf('test')).not.toBe(-1)
    expect(keys.indexOf('foo')).not.toBe(-1)

    const res = Coll.cleanColl(obj)

    const resKeys = Object.keys(res)

    expect(resKeys.indexOf('test')).toBe(-1)
    expect(resKeys.indexOf('foo')).toBe(-1)

  })

  it('should clean null an undefined in arrays', () => {

    const arr = [ undefined, null ]
    const res = Coll.cleanColl(arr)

    expect(arr.length).toBe(2)
    expect(res.length).toBe(0)

  })

  it('should return a new collection ', () => {

    const arr = []

    expect(Coll.cleanColl(arr) === arr).toBe(false)

  })

  it('should clean recursively', () => {

    const arr = [ { value: null, test: { foo: undefined } }, null ]
    const res = Coll.cleanColl(arr)

    expect(res.length).toBe(1)
    expect(Object.keys(res[0]).length).toBe(1)
    expect(Object.keys(res[0])[0]).toBe('test')
    expect(Object.keys(res[0].test).length).toBe(0)

  })

  it('should not clean recursively when false is passed as the second argument', () => {

    const arr = [ { value: null, test: { foo: undefined } }, null ]
    const res = Coll.cleanColl(arr, false)

    expect(res.length).toBe(1)
    expect(res[0].value).toBe(null)
    expect(Object.keys(res[0].test).length).toBe(1)

  })

  it('should log error when first argument is not a collection', () => {

    const oldErr = console.error
    console.error = jest.fn()
    Coll.cleanColl('test')

    expect(console.error).toHaveBeenCalled()

    console.error = oldErr

  })

})
