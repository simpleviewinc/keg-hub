import { areSetEqual } from '../areSetEqual'
describe('areSetEqual', () => {

  it ('should return true if they contain the same elements', () => {
    expect(
      areSetEqual([ 1, 2, 3], [ 1, 2, 3])
    ).toEqual(true)
  })

  it('should return true if they contain the same elements in different orders', () => {
    expect(
      areSetEqual([ 1, 2, 3], [3, 2, 1])
    ).toEqual(true)
  })

  it ('should return true if they contain the same elements in different frequencies', () => {
    expect(
      areSetEqual([ 1, 1, 2, 2, 3], [3, 2, 1])
    ).toEqual(true)

    expect(
      areSetEqual([ 1, 2, 3], [3, 3, 2, 2, 1, 1, 1])
    ).toEqual(true)
  })

  it ('should work with empty arrays', () => {
    expect(
      areSetEqual([], [])
    ).toEqual(true)
  })

  it ('should return false if they contain different elements', () => {
    expect(
      areSetEqual([ 1, 2, 3], [3, 2, 1, 0])
    ).toEqual(false)

    expect(
      areSetEqual([ 1, 2, 4], [3, 2, 1 ])
    ).toEqual(false)

    expect(
      areSetEqual([ 1,], [3, 1 ])
    ).toEqual(false)

    // test that it's finding the longest and shortest
    // arrays and to create the set from the shortest
    expect(
      areSetEqual([ 3, 1, 0 ], [3, 1 ])
    ).toEqual(false)
  })

})