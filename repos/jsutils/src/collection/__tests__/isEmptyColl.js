const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('isEmptyColl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if an object is empty', () => {
    const notEmpty = { data: [ { foo: 'duper' } ] }
    const empty = {}

    expect(Coll.isEmptyColl(notEmpty)).toBe(false)
    expect(Coll.isEmptyColl(empty)).toBe(true)
  })

  it('should handle arrays, and not throw an error', () => {
    const notEmpty = [ 1, 2, 3 ]
    const empty = []

    expect(Coll.isEmptyColl(notEmpty)).toBe(false)
    expect(Coll.isEmptyColl(empty)).toBe(true)
  })

})
