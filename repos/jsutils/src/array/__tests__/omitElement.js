const Arr = require('../')

describe('omitElement', () => {

  it('should return a new array with the element omitted', () => {
    const arr = [1,2,3]
    const result = Arr.omitElement(arr, 2)
    expect(result.length).toEqual(2)
    expect(result).toEqual(expect.not.arrayContaining([ 2 ]))
  })

  it('should do nothing when the element is not in the source array', () => {
    const arr = [1,2,3]
    const result = Arr.omitElement(arr, 5)
    expect(result.length).toEqual(3)
    expect(result).toEqual(expect.arrayContaining([1,2,3]))
  })

  it('should work with the selector to omit reference types by some property', () => {
    const arr = [
      { a: 1 },
      { a: 2 },
      { a: 3 }
    ]
    const test = { a: 1 }
    const result = Arr.omitElement(arr, test, el => el.a)
    expect(result.length).toEqual(2)
    expect(result.some(el => el.a === 1)).toBe(false)
  })

  it ('should omit all duplicates as well', () => {
    const result = Arr.omitElement([ 1, 1, 2, 3], 1)

    expect(result.length).toEqual(2)
    expect(result).toEqual(expect.not.arrayContaining([ 1 ]))

  })
})

