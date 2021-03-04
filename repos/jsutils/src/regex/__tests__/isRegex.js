import { isRegex } from '../'

describe('isRegex', () => {
  it('should return true with regex', () => {
    expect(isRegex(/[0-9]+/)).toEqual(true)
    expect(isRegex(new RegExp('[0-9]+', 'g'))).toEqual(true)
  })

  it('should return false with anything else', () => {
    expect(isRegex({})).toEqual(false)
    expect(isRegex(34)).toEqual(false)
    expect(isRegex('foo')).toEqual(false)
    expect(isRegex('[0-9]+')).toEqual(false)
    expect(isRegex(null)).toEqual(false)
  })

})