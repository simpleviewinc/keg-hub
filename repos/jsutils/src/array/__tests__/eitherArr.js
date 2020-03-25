const Arr = require('../')

describe('eitherArr', () => {
  it ('should return the first arg if it is an array', () => {
    const expected = [ 1 ]
    const result = Arr.eitherArr(expected, 'hello')
    expect(result).toEqual(expected)
  })

  it ('should return the second arg if the first is not an array', () => {
    const expected = [ 1 ] 
    const result = Arr.eitherArr('hello', expected)
    expect(result).toEqual(expected)
  })
})