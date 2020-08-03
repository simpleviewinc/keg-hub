const { findExtrema } = require('../')

describe('findExtrema', () => {
  it ('should find the extrema by a comparator', () => {
    const numbers = [-500, 0, 1, 2, 3.123, 5.999]
    const arrOfObjs = numbers.map(number => ({number}))

    const max = findExtrema(arrOfObjs, (x, y) => x.number - y.number)
    expect(max.number).toEqual(Math.max(...numbers))
  })

  it ('should return null for empty arrays', () => {
    const max = findExtrema([], (x, y) => x.number - y.number)
    expect(max).toBeNull()
  })
})
