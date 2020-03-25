const Num = require('../')

describe('toNum', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a value to a number', () => {
    expect(Num.toNum('44')).toEqual(44)
    expect(Num.toNum('1.34')).toEqual(1.34)
    expect(Num.toNum('asd')).toEqual(0)
  })
  
  it('should handle numbers inside a string', () => {
    expect(Num.toNum('$44.30')).toEqual(44.30)
    expect(Num.toNum('Total: 56%')).toEqual(56)
  })

})
