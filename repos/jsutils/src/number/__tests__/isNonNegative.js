const Num = require('../')

describe('isNonNegative', () => {

  beforeEach(() => jest.resetAllMocks())
  it ('should handle integers and floats', () => {
    expect(Num.isNonNegative(0)).toEqual(true)
    expect(Num.isNonNegative(1)).toEqual(true)
    expect(Num.isNonNegative(-1)).toEqual(false)

    expect(Num.isNonNegative(0.123)).toEqual(true)
    expect(Num.isNonNegative(-0.123)).toEqual(false)
  })

  it ('should handle other types', () => {
    expect(Num.isNonNegative('hello')).toEqual(false)
    expect(Num.isNonNegative([])).toEqual(false)
  })
})
