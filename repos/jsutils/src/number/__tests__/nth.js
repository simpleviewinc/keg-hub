const Num = require('../')

describe('nth', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return the proper ext based on the number', () => {
    expect(Num.nth(21)).toBe('st')
    expect(Num.nth(42)).toBe('nd')
    expect(Num.nth(3)).toBe('rd')
    expect(Num.nth(12)).toBe('th')
    expect(Num.nth(4)).toBe('th')
  })

  it('should return correct ext for string numbers', () => {
    expect(Num.nth(21)).toBe('st')
    expect(Num.nth(42)).toBe('nd')
    expect(Num.nth(3)).toBe('rd')

    expect(Num.nth(12)).toBe('th')
    expect(Num.nth(4)).toBe('th')
    expect(Num.nth(11)).toBe('th')
    expect(Num.nth(12)).toBe('th')
    expect(Num.nth(19)).toBe('th')
    expect(Num.nth(60)).toBe('th')
  })

  it('should return empty string for non-number strings and NaN', () => {
    expect(Num.nth('asdgas')).toBe('')
    expect(Num.nth(null)).toBe('')
    expect(Num.nth(undefined)).toBe('')
    expect(Num.nth(NaN)).toBe('')
  })

  it('should handle number as a string', () => {
    expect(Num.nth('1')).toBe('st')
    expect(Num.nth('52')).toBe('nd')
    expect(Num.nth('123')).toBe('rd')

    expect(Num.nth('444')).toBe('th')
    expect(Num.nth('475')).toBe('th')
    expect(Num.nth('18')).toBe('th')
  })

})
