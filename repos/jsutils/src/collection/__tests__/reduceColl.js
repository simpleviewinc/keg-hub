const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('reduceColl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should loop over a collection of items', () => {
    let counter = 0
    const res = Coll.reduceColl([ 1, 2, 3, 4 ], (key, value, org, reduced) => {
      counter++
      return counter
    }, 0)
    
    expect(counter).toBe(4)
    expect(counter === res).toBe(true)
  })

  it('should return a reduced value', () => {

    let counter = 0
    const res = Coll.reduceColl([ 1, 2, 3, 4 ], (key, value, org, reduced) => {
      counter++
      reduced[value] = counter
      return reduced
    }, {})

    expect(counter).toBe(4)
    expect(typeof res === 'object').toBe(true)
    expect(Object.keys(res).length === 4).toBe(true)
  })

})
