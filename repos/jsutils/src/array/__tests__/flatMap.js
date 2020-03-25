const Arr = require('../')

describe('flatMap', () => {

  beforeEach(() => jest.resetAllMocks())

  it ('should return a flattened, mapped array', () => {
    const arr = [ 1, 2, 3 ]
    const result = Arr.flatMap(arr, x => [ x * x ])

    // a regular .map call with the function above would return [ [1], [4], [9] ], but flatMap should flatten:
    expect(result).toEqual([ 1, 4, 9 ])
  })

  it ('should ignore flattening when encountering anything other than an array', () => {
    const arr = [ 1, 2, 3 ]
    // so the mapping function just returns 'hello' for 2. This requires no flattening, whereas the other elements of the array did require flattening
    // this test just makes sure it doesn't error out trying to flatten a non-array
    const result = Arr.flatMap(arr, x => (x === 2) ? 'hello' : [ x * 3 ])
    expect(result).toEqual([ 3, 'hello', 9 ])
  })
})

