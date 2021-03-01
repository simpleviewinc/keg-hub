import { isQuoted } from '../'

describe('isQuoted', () => {
  it('should return true for quoted text', () => {
    expect(
      isQuoted('"foo bar"')
    ).toBe(true)
  })

  it('should return false for non-quoted text', () => {
    expect(
      isQuoted('foo bar')
    ).toBe(false)
  })

  it('should return false for semi-quoted text', () => {
    expect(
      isQuoted('"foo" bar')
    ).toBe(false)
  })

  it('should work with single quotes', () => {
    expect(
      isQuoted('\'bar\'')
    ).toBe(true)
  })

  it('should return false if the symbols on the string bounds are different', () => {
    expect(
      isQuoted('\'bar\"')
    ).toBe(false)
  })

  it('should work with custom quote symbols', () => {
    expect(
      isQuoted('*boo foo bar*', ['*'])
    ).toBe(true)

    expect(
      isQuoted('boo foo boo', ['*', 'boo'])
    ).toBe(true)
  })
})