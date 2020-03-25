const Str = require('../')

describe('camelCase', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a string to camel case', () => {
    expect(Str.camelCase('CAMEL_CASE')).toEqual('camelCase')
  })

  it('should handle spaces', () => {
    expect(Str.camelCase('CAMEL case')).toEqual('camelCase')
  })

  it('should handle dashs', () => {
    expect(Str.camelCase('CAmEL_case')).toEqual('camelCase')
  })

  it('should handle a mix of spaces dashes and low dashes', () => {
    expect(Str.camelCase('CAm_EL cas-e')).toEqual('camElCasE')
  })

})
