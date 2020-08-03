const Num = require('../')

describe('isPositive', () => {

  beforeEach(() => jest.resetAllMocks())
  it ('should handle integers and floats', () => {
    expect(Num.isPositive(0)).toEqual(false)
    expect(Num.isPositive(1)).toEqual(true)
    expect(Num.isPositive(-1)).toEqual(false)

    expect(Num.isPositive(0.123)).toEqual(true)
    expect(Num.isPositive(-0.123)).toEqual(false)
  })

  it ('should handle other types', () => {
    expect(Num.isPositive('hello')).toEqual(false)
    expect(Num.isPositive([])).toEqual(false)
  })
})
