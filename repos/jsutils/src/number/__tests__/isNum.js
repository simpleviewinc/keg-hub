const Num = require('../')

describe('isNum', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if a value is a number, excluding NaN', () => {
    expect(Num.isNum(0)).toBe(true)
    expect(Num.isNum(34)).toBe(true)
    expect(Num.isNum(0.34)).toBe(true)
    expect(Num.isNum(45.2)).toBe(true)
    expect(Num.isNum(NaN)).toBe(false)
    expect(Num.isNum('foo')).toBe(false)
  })

})
