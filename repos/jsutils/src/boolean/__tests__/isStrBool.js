const Bool = require('../')

describe('isStrBool', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if value is a boolean but as a string', () => {
    expect(Bool.isStrBool({})).toBe(false)
    expect(Bool.isStrBool([])).toBe(false)
    expect(Bool.isStrBool('true')).toBe(true)
    expect(Bool.isStrBool('false')).toBe(true)
    expect(Bool.isStrBool(true)).toBe(false)
    expect(Bool.isStrBool(false)).toBe(false)
  })

})
