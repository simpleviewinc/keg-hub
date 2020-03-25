const Bool = require('../')

describe('softFalsy', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check for falsy', () => {
    expect(Bool.softFalsy(false)).toBe(false)
    expect(Bool.softFalsy(null)).toBe(false)
    expect(Bool.softFalsy(undefined)).toBe(false)
    expect(Bool.softFalsy(NaN)).toBe(false)
  })

  it('should return true for 0', () => {
    expect(Bool.softFalsy(0)).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(Bool.softFalsy('')).toBe(true)
  })

})
