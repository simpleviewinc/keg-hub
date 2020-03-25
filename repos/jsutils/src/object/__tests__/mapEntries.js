const Obj = require('../')
const { isArr } = require('../../array/isArr')

describe('mapEntries', () => {

  beforeEach(() => jest.resetAllMocks())

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

