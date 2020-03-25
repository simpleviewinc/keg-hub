const Arr = require('../')

describe('cloneArr', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should create a copy of the passed in array', () => {
    const arr = [ 1, 2, 3 ]
    const cloned = Arr.cloneArr(arr)

    expect(Array.isArray(cloned)).toBe(true)
    expect(cloned === arr).toBe(false)
    arr.map((item, index) => expect(cloned[index] === item))

  })

  it('should handle non array / object arguments by returning an empty array and not throw', () => {
    const arr = "I am not an array"
    const cloned = Arr.cloneArr(arr)

    expect(Array.isArray(cloned)).toBe(true)
    expect(cloned === arr).toBe(false)
    expect(cloned.length).toBe(0)

  })

  it('should handle object arguments by return an array of entries', () => {
    const arr = { 1: 1, 2: 2, 3: 3 }
    const cloned = Arr.cloneArr(arr)

    expect(Array.isArray(cloned)).toBe(true)
    expect(cloned === arr).toBe(false)
    cloned.map(([ key, value ], index) => expect(arr[key] === value))

  })

})
