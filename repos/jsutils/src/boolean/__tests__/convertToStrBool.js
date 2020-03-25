const Bool = require('../')

describe('convertToStrBool', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a boolean to a string boolean', () => {
    expect(Bool.convertToStrBool(true) === 'true').toBe(true)
    expect(Bool.convertToStrBool(false) === 'false').toBe(true)
    expect(Bool.convertToStrBool('true') === 'true').toBe(true)
    expect(Bool.convertToStrBool('false') === 'false').toBe(true)
  })

  it('should convert any value to a string boolean', () => {
    expect(Bool.convertToStrBool('') === 'false').toBe(true)
    expect(Bool.convertToStrBool(null) === 'false').toBe(true)
    expect(Bool.convertToStrBool(undefined) === 'false').toBe(true)
    expect(Bool.convertToStrBool(0) === 'false').toBe(true)
    expect(Bool.convertToStrBool(1) === 'true').toBe(true)
    expect(Bool.convertToStrBool({}) === 'true').toBe(true)
    expect(Bool.convertToStrBool([]) === 'true').toBe(true)
  })

})