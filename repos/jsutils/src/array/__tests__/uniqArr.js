const Arr = require('../')

describe('uniqArr', () => {
  
  beforeEach(() => jest.resetAllMocks())

  it('should remove duplicates from the passed in array', () => {
    const arr = [ 1, 4, 'test', 1, 7, 'test' ]
    const uniq = Arr.uniqArr(arr)

    expect(uniq.length == arr.length - 2).toBe(true)

    const checkArr = []
    uniq.map((value, index) => {
      expect(checkArr.indexOf(value) === -1)
      checkArr.push(value)
    })

  })

  it('should return the first argument if its not an array', () => {
    const arr = { "test": "object" }
    const uniq = Arr.uniqArr(arr)

    expect(arr === uniq).toBe(true)

  })

})

