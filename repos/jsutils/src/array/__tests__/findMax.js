const { findMax } = require('../')

describe('findMax', () => {
  it ('should find the maximum element in an array of objects, for a given selector', () => {
    const numbers = [ -500, 0, 1, 2, 3, 4.1234, 5.1]
    const arrOfObjects = numbers.map(number => ({ number }))
    const max = findMax(arrOfObjects, obj => obj.number)
    expect(max).toBe(arrOfObjects[arrOfObjects.length - 1])
    expect(max.number).toEqual(Math.max(...numbers))
  })

  it ('should return null if arr is empty', () => {
    const arrOfObjects = []
    const max = findMax(arrOfObjects, obj => obj.number)
    expect(max).toBeNull()
  })

  it ('should return one of the maximums if there are multiple', () => {
    const numbers = [ 5, 5, 5 ]
    const arrOfObjects = numbers.map(number => ({ number }))
    const max = findMax(arrOfObjects, obj => obj.number)
    expect(max.number).toEqual(Math.max(...numbers))
  })

  it ('should work with strings', () => {
    const chars = [ 'A', 'a', 'z' ]
    const arrOfObjects = chars.map(char => ({ char }))
    const max = findMax(arrOfObjects, obj => obj.char)
    expect(max).toBe(arrOfObjects[arrOfObjects.length - 1])
    expect(max.char).toEqual('z')
  })

  it ('should work with an array of primitives', () => {
    const max = findMax([ 1, 2, 3, 4, 5])
    expect(max).toEqual(5)
  })
})
