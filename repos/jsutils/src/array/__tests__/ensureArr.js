const { ensureArr } = require('../')

describe('ensureArr', () => {
  it ('should return the first arg if it is an array', () => {
    const expected = [ 1 ]
    const result = ensureArr(expected)
    expect(result).toEqual(expected)
  })

  it ('should return the first arg in an array if it is not an array', () => {
    const expected = {}
    const result = ensureArr(expected)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toEqual(expected)
  })
})