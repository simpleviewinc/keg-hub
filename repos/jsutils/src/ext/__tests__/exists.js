const Ext = require('../')

describe('exists', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return true for 0', () => {
    expect(Ext.exists(0)).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(Ext.exists('')).toBe(true)
  })

  it('should return false for null', () => {
    expect(Ext.exists(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(Ext.exists(undefined)).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(Ext.exists(NaN)).toBe(false)
  })

  it('should return true for empty objects', () => {
    expect(Ext.exists({})).toBe(true)
    expect(Ext.exists([])).toBe(true)
  })

})
