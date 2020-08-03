const { findMin } = require('../')

describe('findMin', () => {
  it ('should find the minimum element in an array of objects, for a given selector', () => {
    const numbers = [ -500, 0, 1, 2, 3, 4.1234, 5.1]
    const arrOfObjects = numbers.map(number => ({ number }))
    const min = findMin(arrOfObjects, obj => obj.number)
    expect(min).toBe(arrOfObjects[0])
    expect(min.number).toEqual(Math.min(...numbers))
  })

  it ('should return null if arr is empty', () => {
    const arrOfObjects = []
    const min = findMin(arrOfObjects, obj => obj.number)
    expect(min).toBeNull()
  })

  it ('should return one of the minimums if there are multiple', () => {
    const numbers = [ 5, 5, 5 ]
    const arrOfObjects = numbers.map(number => ({ number }))
    const min = findMin(arrOfObjects, obj => obj.number)
    expect(min.number).toEqual(Math.min(...numbers))
  })

  it ('should work with strings', () => {
    const chars = [ 'a', 'z' ]
    const arrOfObjects = chars.map(char => ({ char }))
    const min = findMin(arrOfObjects, obj => obj.char)
    expect(min).toBe(arrOfObjects[0])
    expect(min.char).toEqual('a')
  })

  it ('should work with an array of primitives', () => {
    const min = findMin([ 1, 2, 3, 4, 5])
    expect(min).toEqual(1)
  })
})
