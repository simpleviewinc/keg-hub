const { isDockerId } = require('../isDockerId')

describe('isDockerId', () => {

  afterAll(() => jest.resetAllMocks())

  it('It should return true for a valid docker id', () => {
    expect(isDockerId('ba9e35cde327')).toBe(true)
    expect(isDockerId('eb9e92ea6354')).toBe(true)
    expect(isDockerId('3ad8d5edbf6c')).toBe(true)
    expect(isDockerId('1caa46fa11ba')).toBe(true)
    expect(isDockerId('56aa46fa11ba')).toBe(true)
    expect(isDockerId('a2aba7cf204f')).toBe(true)
    expect(isDockerId('b80dcb1cac10')).toBe(true)
    expect(isDockerId('3b74af475ff2')).toBe(true)
    expect(isDockerId('a56406239194')).toBe(true)
  })

  it('It should return false for an  invalid docker id', () => {
    expect(isDockerId('')).toBe(false)
    expect(isDockerId(123)).toBe(false)
    expect(isDockerId(123456789123)).toBe(false)
    expect(isDockerId('12345678912R')).toBe(false)
    expect(isDockerId('aaa')).toBe(false)
    expect(isDockerId([])).toBe(false)
    expect(isDockerId({})).toBe(false)
    expect(isDockerId(true)).toBe(false)
    expect(isDockerId('{}')).toBe(false)
  })

})