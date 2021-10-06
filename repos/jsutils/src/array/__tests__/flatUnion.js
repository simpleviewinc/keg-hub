const Arr = require('../')

const arr1 = [1,1,2]
const arr2 = [{a: 1}, { a: 3 }]

describe('flatUnion', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a single array with only unique values', () => {
    expect(Arr.flatUnion([1,2], [...arr1, 3])).toEqual([1,2,3])
  })

  it ('work with object and except a selector compare function', () => {
    expect(
      Arr.flatUnion([{a: 1}, { a: 3 }], [{a: 4}, { a: 1 }], item => item.a)
    ).toEqual([{ a: 1 }, { a: 3 }, { a: 4 }])
  })

  it ('work with array with mixed strings and numbers', () => {
    expect(
      Arr.flatUnion(['test', 0, 123, 'test', 'not-duplicate', 0, 43])
    ).toEqual(['test', 0, 123, 'not-duplicate', 43])
  })

})

