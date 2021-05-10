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
      (squared, idx) => squared === 9 && idx === 2
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

  it('should work with objects', () => {
    const elements = {
      a: 1,
      b: 2,
      c: 3
    }
    const result = mapFind(
      elements, 
      (num, key, idx) => ({ input: num, output: num ** 2, key, idx }),
      ({ output }) => output === 9
    )
    expect(result).toEqual({
      input: 3,
      output: 9,
      key: 'c',
      idx: 2
    })
  })
})