const Bool = require('../')

describe('isBool', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if a value is a boolean', () => {
    expect(Bool.isBool(false)).toBe(true)
    expect(Bool.isBool(true)).toBe(true)
    expect(Bool.isBool(null)).toBe(false)
    expect(Bool.isBool(undefined)).toBe(false)
    expect(Bool.isBool({})).toBe(false)
    expect(Bool.isBool([])).toBe(false)
    expect(Bool.isBool('')).toBe(false)
    expect(Bool.isBool(0)).toBe(false)
  })

})
