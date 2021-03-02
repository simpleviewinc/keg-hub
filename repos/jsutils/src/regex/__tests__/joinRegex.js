import { joinRegex } from '../'

describe('joinRegex', () => {
  const expA = /[A-z]+/
  const expB = /[0-9]+/

  it('should join expressions into one combined or-expression', () => {
    const joined = joinRegex(expA, expB)

    expect(joined).toBeDefined()

    expect('hello'.match(joined)).toBeDefined()
    expect('123'.match(joined)).toBeDefined()
    expect('$'.match(joined)).toEqual(null)
  })

  it('should accept an options string', () => {
    const joined = joinRegex(expA, expB, 'g')
    expect('123 foo 456'.match(joined)).toEqual(
      expect.arrayContaining(['123', 'foo', '456'])
    )
  })

  it('should also accept an array of expressions', () => {
    const joined = joinRegex([ expA, expB ], 'g')
    expect('123 foo 456'.match(joined)).toEqual(
      expect.arrayContaining(['123', 'foo', '456'])
    )
  })

  it('should work with > 2 expressions', () => {
    const joined = joinRegex(expA, expB, /\=/, 'g')
    expect('abc ='.match(joined)).toEqual(
      expect.arrayContaining(['abc', '='])
    )
  })

  it('should work with regex strings', () => {
    const joined = joinRegex('[0-9]+', expA, 'g')
    expect('123'.match(joined)).toEqual(
      expect.arrayContaining(['123'])
    )
  })
})