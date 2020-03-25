const Num = require('../')

describe('isFloat', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if a value is a float', () => {
    expect(Num.isFloat(0.34)).toBe(true)
    expect(Num.isFloat(45.2)).toBe(true)
    expect(Num.isFloat(0)).toBe(false)
    expect(Num.isFloat(34)).toBe(false)
    expect(Num.isFloat(NaN)).toBe(false)
    expect(Num.isFloat('foo')).toBe(false)
  })

})
