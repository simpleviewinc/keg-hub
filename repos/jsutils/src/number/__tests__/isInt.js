const Num = require('../')

describe('isInt', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if a value is an int', () => {
    expect(Num.isInt(0)).toBe(true)
    expect(Num.isInt(34)).toBe(true)
    expect(Num.isInt(0.34)).toBe(false)
    expect(Num.isInt(45.2)).toBe(false)
    expect(Num.isInt(NaN)).toBe(false)
    expect(Num.isInt('foo')).toBe(false)
  })

})