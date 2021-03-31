import { mod } from '../'
describe('mod', () => {
  it('should work with positive values', () => {
    expect(
      mod(15, 10)
    ).toEqual(15 % 10)
  })

  it('should work with zero', () => {
    expect(
      mod(0, 10)
    ).toEqual(0 % 10)
  })

  it('should work with negative values', () => {
    expect(
      mod(-1, 10)
    ).toEqual(9)
  })

  it('should return 0 for falsey values', () => {
    expect(
      mod(null, 10)
    ).toEqual(0)

    expect(
      mod(false, 10)
    ).toEqual(0)

    expect(
      mod('', 10)
    ).toEqual(0)
  })

  it('should return NaN for other types', () => {
    expect(
      mod(undefined, 10)
    ).toEqual(NaN)
  })
})