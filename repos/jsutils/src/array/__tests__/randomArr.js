const Arr = require('../')

describe('randomArr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should randomly select values from a passed in array', () => {
    const arr = [ 1, 4, 5, 3, 7, 'test' ]
    const random = Arr.randomArr(arr, 3)

    random.map(item => expect(arr.indexOf(item) !== -1).toBe(true))

  })

  it('should arrays with a length equal to the second argument', () => {
    const arr = [ 1, 4, 5, 3, 7, 'test' ]
    const random = Arr.randomArr(arr, 3)
    const random2 = Arr.randomArr(arr, 8)
    const random3 = Arr.randomArr(arr, 1)

    expect(random.length).toBe(3)
    expect(random2.length).toBe(8)
    expect(random3.length).toBe(1)

  })

  it('should return a random array item if no amount is passed in', () => {
    const arr = [ 1, 4, 5, 3, 7, 'test' ]
    const random1 = Arr.randomArr(arr)
    const random2 = Arr.randomArr(arr)
    const random3 = Arr.randomArr(arr)

    expect(arr.indexOf(random1) !== -1).toBe(true)
    expect(arr.indexOf(random2) !== -1).toBe(true)
    expect(arr.indexOf(random3) !== -1).toBe(true)

  })

  it('should return the first argument if its not an array', () => {
    const arr = { "test": "object" }
    const random = Arr.randomArr(arr)

    expect(arr === random).toBe(true)

  })

})
