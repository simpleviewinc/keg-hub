const Ext = require('../')

describe('isSame', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if two passed in arguments are exactly same', () => {
    expect(Ext.isSame(NaN, NaN)).toBe(true)
    expect(Ext.isSame(false, false)).toBe(true)
    expect(Ext.isSame(0, 0)).toBe(true)
    expect(Ext.isSame([], [])).toBe(false)
    expect(Ext.isSame('', ' ')).toBe(false)
    expect(Ext.isSame(Infinity, NaN)).toBe(false)
  })

})
