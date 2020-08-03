import { compareTo } from '../'

describe('compareTo', () => {
  it ('should compare strings', () => {
    expect(compareTo('A', 'z')).toEqual(-1)
    expect(compareTo('z', 'A')).toEqual(1)
    expect(compareTo('foo', 'foo')).toEqual(0)
  })

  it ('should compare numbers', () => {
    expect(compareTo(-1, 1)).toBeLessThan(0)
    expect(compareTo(50, 49)).toBeGreaterThan(0)
    expect(compareTo(1.23, 1.23)).toEqual(0)
  })

  it ('should compare booleans', () => {
    expect(compareTo(false, true)).toBeLessThan(0)
    expect(compareTo(true, false)).toBeGreaterThan(0)
    expect(compareTo(true, true)).toEqual(0)
    expect(compareTo(false, false)).toEqual(0)
  })
})