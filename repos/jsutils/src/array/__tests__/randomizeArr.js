const Arr = require('../')

describe('randomizeArr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should randomly sort the passed in array', () => {
    const arr = [ 1, 4, 5, 3, 7, 'test' ]
    const random1 = Arr.randomizeArr(Array.from(arr))
    const random1Indexes = random1.map(( value, index ) => index)

    random1.map((item, index) => expect(arr.indexOf(item) !== -1).toBe(true))
    
    // It's possible that it randomly set the array to be exactly the same
    // But the odds are very low that would happen
    let isDiff
    random1.map((value, index) => {
      if(isDiff) return
      if(value !== arr[index]) isDiff = true
    })

    expect(isDiff).toBe(true)
  })

  it('should return the first argument if its not an array', () => {
    const arr = { "test": "object" }
    const random = Arr.randomizeArr(arr)

    expect(arr === random).toBe(true)

  })

})
