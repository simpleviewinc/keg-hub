const Num = require('../')

describe('toFloat', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a value to a float', () => {
    expect(Num.toFloat('44.3')).toEqual(44.3)
    expect(Num.toFloat('0.1')).toEqual(0.1)
    expect(Num.toFloat('asd')).toEqual(0)
  })
  
  it('should handle numbers inside a string', () => {
    expect(Num.toFloat('$44.30')).toEqual(44.3)
    expect(Num.toFloat('Total: 0.56%')).toEqual(0.56)
  })
  
})