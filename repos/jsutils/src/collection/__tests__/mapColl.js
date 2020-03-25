const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('mapColl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should loop over a collection of items', () => {
    let counter = 0
    const res = Coll.mapColl([ 1,2,3,4 ], () => {
      counter++
      return counter
    })
    
    expect(counter).toBe(4)
    expect(Array.isArray(res)).toBe(true)
  })
  
  it('should return as array when an object is passed in', () => {
    let counter = 0
    const res = Coll.mapColl({ 1:1, 2:2, 3:3 }, (key, value, coll) => {
      counter++
      return counter
    })
    
    expect(counter).toBe(3)
    expect(Array.isArray(res)).toBe(true)
    expect(typeof res === 'object').toBe(true)
  })
  
})
