import { reverseStr } from '../'

describe('reverseStr', () => {
  it('should reverse a string', () => {
    const str = 'hello'
    const expected = 'olleh'
    expect(reverseStr(str)).toEqual(expected)
  })

  it('should return undefined for non-strings', () => {
    expect(reverseStr(63)).toBeUndefined()
  })

  it('should work with empty strings', () => {
    expect(reverseStr('')).toEqual('')
  })

  it('should work with single characters', () => {
    expect(reverseStr('a')).toEqual('a')
  })
})