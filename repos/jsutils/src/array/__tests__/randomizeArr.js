const Arr = require('../')

describe('randomizeArr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should randomly sort the passed in array', () => {
    const arr = [ 1, 4, 5, 3, 7, 'test' ]
    const random1 = Arr.randomizeArr(Array.from(arr))
    random1.map(item => expect(arr.indexOf(item) !== -1).toBe(true))
  })

  it('should return the first argument if its not an array', () => {
    const arr = { "test": "object" }
    const random = Arr.randomizeArr(arr)

    expect(arr === random).toBe(true)

  })

})
