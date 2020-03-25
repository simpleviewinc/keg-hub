const Bool = require('../')

describe('toBool', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a value to a boolean', () => {
    expect(Bool.toBool('true') === true).toBe(true)
    expect(Bool.toBool('false') === false).toBe(true)
    expect(Bool.toBool('data') === true).toBe(true)
    expect(Bool.toBool({}) === true).toBe(true)
    expect(Bool.toBool([]) === true).toBe(true)
  })

  it('should convert falsy values to false', () => {
    expect(Bool.toBool(false) === false).toBe(true)
    expect(Bool.toBool('false') === false).toBe(true)
    expect(Bool.toBool('') === false).toBe(true)
    expect(Bool.toBool(0) === false).toBe(true)
    expect(Bool.toBool('0') === false).toBe(true)
    expect(Bool.toBool(null) === false).toBe(true)
    expect(Bool.toBool(undefined) === false).toBe(true)
    expect(Bool.toBool(NaN) === false).toBe(true)
  })

})
