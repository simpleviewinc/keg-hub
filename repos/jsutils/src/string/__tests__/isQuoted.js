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

  it('should reutrn false for semi-quoted text', () => {
    expect(
      isQuoted('"foo" bar')
    ).toBe(false)
  })
})