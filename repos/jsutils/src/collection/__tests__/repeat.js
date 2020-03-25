const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('repeat', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should repeat the element the specified number of times', () => {
    const length = 5
    const element = 1
    const repeated = Coll.repeat(element, length)
    expect(repeated.length).toEqual(length)
    repeated.forEach(el => expect(el).toEqual(element))
  })
  
  it('should work with functions as the element', () => {
    const element = 2
    const func = () => 2
    const length = 10
    const repeated = Coll.repeat(func, length)
    expect(repeated.length).toEqual(length)
    repeated.forEach(el => expect(el).toEqual(element))
  }) 

  it('should return an empty array if the times arg is <= 0', () => {
    expect(Coll.repeat(1, null)).toEqual([])
    expect(Coll.repeat(1, 0)).toEqual([])
    expect(Coll.repeat(1, -1)).toEqual([])
  })

  it('should log errors and return an empty array if something other than a number is passed as times', () => {
    const orgError = console.error
    console.error = jest.fn()
    expect(Coll.repeat(1, "hi")).toEqual([])
    expect(console.error).toHaveBeenCalled()
    console.error = orgError
  })

  it('should deeply clone elements if the flag is specified', () => {
    const element = {a: {b: 1}}
    const repeatedEl = Coll.repeat(element, 1, true)[0]
    expect(repeatedEl.a.b).toEqual(element.a.b)
    expect(Object.is(repeatedEl, element)).toBe(false)
    expect(Object.is(repeatedEl.a, element.a)).toBe(false)
  })
})

