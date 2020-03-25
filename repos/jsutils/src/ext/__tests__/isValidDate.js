const Ext = require('../')

describe('isValidDate', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if the input is a valid date', () => {
    expect(Ext.isValidDate(new Date())).toBe(true)
    expect(Ext.isValidDate(new Date('434foo'))).toBe(false)
    expect(Ext.isValidDate({})).toBe(false)
  })

  it('should handle passing in a valid date string', () => {
    const timeStr = new Date().getTime()
    const dateStr = new Date().toString()
    expect(Ext.isValidDate(timeStr)).toBe(true)
    expect(Ext.isValidDate(dateStr)).toBe(true)
    expect(Ext.isValidDate('May 4th 1984')).toBe(false)
  })

})
