const Ext = require('../')

describe('isEmpty', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if the value is empty for object', () => {
    expect(Ext.isEmpty({})).toBe(true)
    expect(Ext.isEmpty({ foo: 'bar' })).toBe(false)
  })

  it('should check if the value is empty for array', () => {
    expect(Ext.isEmpty([])).toBe(true)
    expect(Ext.isEmpty([ 'foo' ])).toBe(false)
  })
  
  it('should check if the value is empty for string', () => {
    expect(Ext.isEmpty('')).toBe(true)
    expect(Ext.isEmpty('    ')).toBe(true)
    expect(Ext.isEmpty('  t  ')).toBe(false)
    expect(Ext.isEmpty('foo')).toBe(false)
  })
  
  it('should check if the value is empty for number', () => {
    expect(Ext.isEmpty(0)).toBe(true)
    expect(Ext.isEmpty(-1)).toBe(true)
    expect(Ext.isEmpty(1)).toBe(false)
  })

})
