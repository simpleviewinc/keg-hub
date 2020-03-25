const Ext = require('../')

describe('typeOf', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return the correct type from the passed in param', () => {
    expect(Ext.typeOf('') === 'String').toBe(true)
    expect(Ext.typeOf('1234') === 'String').toBe(true)
    expect(Ext.typeOf(1234) === 'Number').toBe(true)
    expect(Ext.typeOf({}) === 'Object').toBe(true)
    expect(Ext.typeOf([]) === 'Array').toBe(true)
    expect(Ext.typeOf(undefined) === 'Undefined').toBe(true)
    expect(Ext.typeOf(NaN) === 'Number').toBe(true)
    expect(Ext.typeOf(null) === 'Null').toBe(true)
  })

})
