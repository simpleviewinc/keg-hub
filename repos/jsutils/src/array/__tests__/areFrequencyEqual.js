import { areFrequencyEqual } from '../areFrequencyEqual'
describe('areFrequencyEqual', () => {
  it('should return true if arrays contain the same elements and frequencies', () => {
    expect(
      areFrequencyEqual([ 1, 1, 2, 4, 4, 4], [ 4, 4, 1, 2, 1, 4])
    ).toEqual(true)
  })

  it ('should work with empty arrays', () => {
    expect(
      areFrequencyEqual([], [])
    ).toEqual(true)
  })

  it('should return false if arrays are different lengths', () => {
    expect(
      areFrequencyEqual([ ], [ 1 ])
    ).toEqual(false)
  })

  it ('should return false if same-length arrays contain different elements', () => {
    expect(
      areFrequencyEqual([ 1, 1, 2 ], [ 1, 1, 3 ])
    ).toEqual(false)
  })

  it ('should return true if arrays contain the same elements', () => {
    expect(
      areFrequencyEqual([ 1, 2, 3], [ 1, 2, 3])
    ).toEqual(true)
  })

})