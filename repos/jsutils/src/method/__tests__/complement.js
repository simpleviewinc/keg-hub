import { complement } from '../'

describe('complement', () => {
  it ('should return the inverse of a predicate function', () => {
    const isNegative = x => x < 0
    const isNonNegative = complement(isNegative)
    expect(isNonNegative(-1)).toEqual(false)
    expect(isNonNegative(0)).toEqual(true)
    expect(isNonNegative(1)).toEqual(true)
  })

  it ('should return null when passed non-function', () => {
    const result = complement('hello')
    expect(result).toBeNull()
  })
})