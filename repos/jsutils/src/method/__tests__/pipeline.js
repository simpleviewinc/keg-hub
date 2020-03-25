const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('pipeline', () => {

  beforeEach(() => jest.resetAllMocks())
  const square = (x) => x * x
  const subtractBy = (x, y) => x - y
  const startingValue = 2
  it('should return the value run through the pipeline', () => {
    const result = Method.pipeline(
      startingValue,
      (num) => num + 1,
      square
    )

    expect(result).toEqual(9)
  })

  it('should work with array expressions', () => {
    const result = Method.pipeline(
      2,
      square,
      [subtractBy, 5] // take the square of 2 and subtract 5 from it
    )
    expect(result).toEqual(-1)
  })

  it('should NOT call its first argument, if it is a function', () => {
    const result = Method.pipeline(() => 2, (x) => x() * 10)
    expect(result).toEqual(20)
  })

  it('should return the element if no functions are specified', () => {
    const element = "foo"
    const result = Method.pipeline(element)
    expect(result).toEqual(element)
  })

  it('should log errors if it encountered an invalid expression', () => {
    const orgError = console.error
    console.error = jest.fn()
    expect(Method.pipeline(1, square, "invalid expression")).toEqual(1)
    expect(console.error).toHaveBeenCalled()
    console.error = orgError
  })
})
