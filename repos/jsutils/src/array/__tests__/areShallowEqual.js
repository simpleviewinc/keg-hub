import { areShallowEqual } from '../areShallowEqual'
describe('areShallowEqual', () => {
  it('should return false for different length arrays', () => {
    expect(
      areShallowEqual([ 1, 2 ], [1])
    ).toEqual(false)
  })

  it('should return false for different element orders', () => {
    expect(
      areShallowEqual([ 1, 2 ], [ 2, 1 ])
    ).toEqual(false)
  })

  it('should return false for different elements', () => {
    expect(
      areShallowEqual([ 1, 2 ], [ 1, 3 ])
    ).toEqual(false)
  })

  it('should return true for same elements and order', () => {
    expect(
      areShallowEqual([ 1, 2, 3, 7, -1 ], [ 1, 2, 3, 7, -1 ])
    ).toEqual(true)
  })

  it ('should return true for empty arrays', () => {
    expect(
      areShallowEqual([], [])
    ).toEqual(true)
  })
})