import { getRegexSource } from '../'
describe('getRegexSource', () => {
  it('should return the source of a regexp instance', () => {
    expect(
      getRegexSource(/[A-z]+/)
    ).toEqual(
      '[A-z]+'
    )
  })

  it('should return strings unchanged', () => {
    expect(
      getRegexSource('foo')
    ).toEqual(
      'foo'
    )
  })

  it('should return null for other types', () => {
    expect(
      getRegexSource(63)
    ).toEqual(
      null
    )
  })
})