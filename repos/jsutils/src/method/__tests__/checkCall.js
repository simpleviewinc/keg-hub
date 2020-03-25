const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('checkCall', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if a method, and call it with passed in params', () => {
    const testMethod = jest.fn(() => {})
    Method.checkCall(testMethod, 1,2,3)
    expect(testMethod).toHaveBeenCalledWith(1,2,3)
  })

  it('should not try to call a method if its not a function', () => {
    expect(Method.checkCall(null, 1,2,3)).toEqual(undefined)
  })

})
