const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('isColl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if the value is a collection', () => {
    expect(Coll.isColl({})).toBe(true)
    expect(Coll.isColl()).toBe(false)
    expect(Coll.isColl([])).toBe(true)
    expect(Coll.isColl(() => {})).toBe(false)
    expect(Coll.isColl(1)).toBe(false)
    expect(Coll.isColl('')).toBe(false)
    expect(Coll.isColl(null)).toBe(false)
    expect(Coll.isColl(NaN)).toBe(false)
  })

})
