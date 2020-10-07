import { isArrMap } from '../isArrMap'
describe('isArrMap', () => {
  it ('should return true if input is a valid array map', () => {
    const input = {
      a: [ 1, 2, 3],
      b: [ 1, 2 ],
      c: []
    }
    expect(isArrMap(input)).toEqual(true)
  })

  it ('should reject objects with non-array values', () => {
    const input = {
      a: [ 1, 2, 3],
      b: [],
      c: 5 
    }
    expect(isArrMap(input)).toEqual(false)
  })

  it ('should reject empty objects', () => {
    const input = {}
    expect(isArrMap(input)).toEqual(false)
  })

  it ('should reject arrays of arrays', () => {
    const input = [ [1], [2] ]
    expect(isArrMap(input)).toEqual(false)
  })
})