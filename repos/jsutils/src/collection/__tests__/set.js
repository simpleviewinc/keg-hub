const Coll = require('../')
const { isArr } = require('../../array/isArr')
const { isObj } = require('../../object/isObj')

describe('set', () => {

  beforeEach(() => jest.resetAllMocks())
  it('should set a value on an object', () => {
    const setObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.1'
    Coll.set(setObj, path, 'bar')
    
    expect(setObj.data[1] === 'bar').toBe(true)
  })
  
  it('should set a deeply nested value on an object', () => {
    const setObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.0.bar'
    Coll.set(setObj, path, 'test')
    
    expect(setObj.data[0].bar === 'test').toBe(true)
  })
  
  it('should return the original object', () => {
    const setObj = { data: [ { foo: 'duper' } ] }
    const path = 'data.0.bar'
    const res = Coll.set(setObj, path, 'test')

    expect(setObj === res).toBe(true)
  })

})
