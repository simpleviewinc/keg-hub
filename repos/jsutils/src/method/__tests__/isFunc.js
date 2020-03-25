const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('isFunc', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return true when passed in parm is a function', () => {
    expect(Method.isFunc(jest.fn())).toEqual(true)
  })

  it('should return false when passed in parm is not a function', () => {
    expect(Method.isFunc(null)).toEqual(false)
  })

})
