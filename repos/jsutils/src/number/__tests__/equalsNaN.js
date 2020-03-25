const Num = require('../')

describe('equalsNaN', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if the value is NaN', () => {
    expect(Num.equalsNaN(NaN)).toBe(true)
    expect(Num.equalsNaN(0)).toBe(false)
    expect(Num.equalsNaN(-1)).toBe(false)
    expect(Num.equalsNaN('NaN')).toBe(false)
  })

})
