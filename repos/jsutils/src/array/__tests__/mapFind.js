import { mapFind } from '../'
describe('mapFind', () => {
  it('It should find the first defined mapped value when no test function is specified', () => {
    const elements = [1,2,3]
    const expected = {}
    const result = mapFind(elements, x => x === 2 ? expected : null)
    expect(result).toBe(expected)
  })
  it('should find the first mapped value passing the test function', () => {
    const elements = [1,2,3]
    const expected = 9
    const result = mapFind(
      elements, 
      x => x ** 2,
      x => x === 9
    )
    expect(result).toBe(expected)
  })
  it('should return null for no match', () => {
    const elements = [1,2,3]
    const result = mapFind(
      elements, 
      x => x ** 2,
      x => x === -1
    )
    expect(result).toBe(null)

  })
})