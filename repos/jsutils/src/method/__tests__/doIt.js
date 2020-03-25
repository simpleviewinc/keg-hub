const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('doIt', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should execute the callback n times based on passed in param', () => {
    const callback = jest.fn((index, arr, data) => arr.push(index))
    Method.doIt(5, global, [], callback)

    expect(callback).toHaveBeenCalledTimes(5)
  })

  it('should stop call the callback when the last callback returned false', () => {
    let isBound
    const callback = jest.fn((index, arr, data) => { return false })
    Method.doIt(3, global, [], callback)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should keep calling the callback when the callback returns falsy but not false', () => {
    let isBound
    const callback = jest.fn((index, arr, data) => { return undefined })
    Method.doIt(3, global, [], callback)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should return an array of response from the return of the callback', () => {
    let isBound
    const callback = jest.fn((index, arr, data) => { return Math.floor(Math.random() * 10) })
    const responses = Method.doIt(3, global, [], callback)
    
    expect(isArr(responses)).toBe(true)
    expect(responses.length).toBe(3)
  })

  it('should bind the callback to the second argument', () => {
    let isBound
    const callback = jest.fn(function(index, arr, data){ isBound = this === global })
    Method.doIt(1, global, [], callback)

    expect(isBound).toBe(true)
  })

  it('should pass all arguments to the callback after first 2, and exclude the last', () => {
    let has1
    let has2
    let has3
    const callback = jest.fn((index, is1, is2, is3) => {
      has1 = is1
      has2 = is2
      has3 = is3
    })
    Method.doIt(1, global, 1, 2, 3, callback)
    
    expect(has1).toBe(1)
    expect(has2).toBe(2)
    expect(has3).toBe(3)
  })

})
