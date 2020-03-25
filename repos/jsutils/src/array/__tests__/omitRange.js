const Arr = require('../')

describe('omitRange', () => {

  let originalConsole
  beforeEach(() => {
    jest.resetAllMocks()
    originalConsole = console.error
  })

  afterEach(() => {
    console.error = originalConsole
  })

  it('should return a new array with the range omitted', () => {
    const array = Object.freeze([1,2,3,4,5])
    const newArray = Arr.omitRange(array, 1, 2)
    expect(array).toEqual([1,2,3,4,5])
    expect(newArray).not.toBe(array)
    expect(newArray).toEqual([1,4,5])
  })

  it('should work with a count exceeding the length of the array', () => {
    const array = Object.freeze([1,2,3,4,5])
    const newArray = Arr.omitRange(array, 0, 9)
    expect(array).toEqual([1,2,3,4,5])
    expect(newArray).toEqual([])
  })

  it("should console error when passing in something other than an array", () => {
    console.error = jest.fn()
    const result = Arr.omitRange(1, 2, 3) 
    expect(result).toEqual(1)
    expect(console.error).toBeCalled()
  })

  it("should console error with invalid range input", () => {

    const cases = [
      [['x'], -1, 1],
      [['x'], 1, -1],
      [['x'], null, 1],
      [['x'], 1, null]
    ]

    cases.forEach(([arr, start, count]) => {
      console.error = jest.fn()
      const result = Arr.omitRange(arr, start, count) 
      expect(result).toEqual(['x'])
      expect(console.error).toBeCalled()
    })
  })
})

