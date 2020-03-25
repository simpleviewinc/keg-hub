const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('unset', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should remove a value from an object', () => {
    const getObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.0'
    Coll.unset(getObj, path)
    
    expect(getObj.data[0] === undefined).toBe(true)
  })

  it('should remove a value from an deeply nested object', () => {
    const getObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.0.foo'
    Coll.unset(getObj, path)
    
    expect(getObj.data[0].foo === undefined).toBe(true)
  })

  it('should return true if the value was removed', () => {
    const getObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.0.foo'
    const res = Coll.unset(getObj, path)
    
    expect(res).toBe(true)
  })
  
})
