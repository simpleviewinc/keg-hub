const Str = require('../')

describe('styleCase', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a string into style case', () => {
    expect(Str.styleCase('background-color')).toEqual('backgroundColor')
  })

  it('should handle spaces', () => {
    expect(Str.styleCase('background color')).toEqual('backgroundColor')
  })

  it('should handle low dashes', () => {
    expect(Str.styleCase('background-color')).toEqual('backgroundColor')
  })

  it('should handle mixed spaces dashes and low dashes', () => {
    expect(Str.styleCase('-background color_')).toEqual('backgroundColor')
  })

})
