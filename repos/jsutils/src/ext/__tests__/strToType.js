const Ext = require('../')

describe('strToType', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should convert a string to its type', () => {
    const falsy = Ext.strToType('false')
    const truthy = Ext.strToType('true')
    const number = Ext.strToType('12345')
    const zero = Ext.strToType('0')
    const object = Ext.strToType('{}')
    const array = Ext.strToType('[]')

    expect(typeof falsy).toBe('boolean')
    expect(falsy === false).toBe(true)
    expect(typeof truthy).toBe('boolean')
    expect(truthy === true).toBe(true)

    expect(typeof number).toBe('number')
    expect(number === 12345).toBe(true)
    expect(typeof zero).toBe('number')
    expect(zero === 0).toBe(true)
    
    expect(typeof object).toBe('object')
    expect(Array.isArray(array)).toBe(true)
  })

})
