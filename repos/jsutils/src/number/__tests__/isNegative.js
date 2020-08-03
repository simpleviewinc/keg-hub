const Num = require('../')

describe('isNegative', () => {

  beforeEach(() => jest.resetAllMocks())
  it ('should handle integers and floats', () => {
    expect(Num.isNegative(0)).toEqual(false)
    expect(Num.isNegative(1)).toEqual(false)
    expect(Num.isNegative(-1)).toEqual(true)

    expect(Num.isNegative(0.123)).toEqual(false)
    expect(Num.isNegative(-0.123)).toEqual(true)
  })

  it ('should handle other types', () => {
    expect(Num.isNegative('hello')).toEqual(false)
    expect(Num.isNegative([])).toEqual(false)
  })
})
