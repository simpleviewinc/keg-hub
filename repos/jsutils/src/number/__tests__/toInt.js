const Num = require('../')

describe('toInt', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a value to an int', () => {
    expect(Num.toInt('44')).toEqual(44)
    expect(Num.toInt('1')).toEqual(1)
    expect(Num.toInt('asd')).toEqual(0)
  })
  
  it('should handle numbers inside a string', () => {
    expect(Num.toInt('$44.30')).toEqual(44)
    expect(Num.toInt('Total: 56%')).toEqual(56)
  })

})
