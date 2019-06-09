const Bool = require('../boolean')

describe('/boolean', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('isBool', () => {

    it('should check if a value is a boolean', () => {
      expect(Bool.isBool(false)).toBe(true)
      expect(Bool.isBool(true)).toBe(true)
      expect(Bool.isBool(null)).toBe(false)
      expect(Bool.isBool(undefined)).toBe(false)
      expect(Bool.isBool({})).toBe(false)
      expect(Bool.isBool([])).toBe(false)
      expect(Bool.isBool('')).toBe(false)
      expect(Bool.isBool(0)).toBe(false)
    })

  })

  describe('isStrBool', () => {

    it('should check if value is a boolean but as a string', () => {
      expect(Bool.isStrBool({})).toBe(false)
      expect(Bool.isStrBool([])).toBe(false)
      expect(Bool.isStrBool('true')).toBe(true)
      expect(Bool.isStrBool('false')).toBe(true)
      expect(Bool.isStrBool(true)).toBe(false)
      expect(Bool.isStrBool(false)).toBe(false)
    })

  })

  describe('convertToStrBool', () => {

    it('should convert a boolean to a string boolean', () => {
      expect(Bool.convertToStrBool(true) === 'true').toBe(true)
      expect(Bool.convertToStrBool(false) === 'false').toBe(true)
      expect(Bool.convertToStrBool('true') === 'true').toBe(true)
      expect(Bool.convertToStrBool('false') === 'false').toBe(true)
    })

    it('should convert any value to a string boolean', () => {
      expect(Bool.convertToStrBool('') === 'false').toBe(true)
      expect(Bool.convertToStrBool(null) === 'false').toBe(true)
      expect(Bool.convertToStrBool(undefined) === 'false').toBe(true)
      expect(Bool.convertToStrBool(0) === 'false').toBe(true)
      expect(Bool.convertToStrBool(1) === 'true').toBe(true)
      expect(Bool.convertToStrBool({}) === 'true').toBe(true)
      expect(Bool.convertToStrBool([]) === 'true').toBe(true)
    })

  })

  describe('softFalsy', () => {

    it('should check for falsy', () => {
      expect(Bool.softFalsy(false)).toBe(false)
      expect(Bool.softFalsy(null)).toBe(false)
      expect(Bool.softFalsy(undefined)).toBe(false)
      expect(Bool.softFalsy(NaN)).toBe(false)
    })

    it('should return true for 0', () => {
      expect(Bool.softFalsy(0)).toBe(true)
    })

    it('should return true for empty string', () => {
      expect(Bool.softFalsy('')).toBe(true)
    })

  })

  describe('toBool', () => {

    it('should convert a value to a boolean', () => {
      expect(Bool.toBool('true') === true).toBe(true)
      expect(Bool.toBool('false') === false).toBe(true)
      expect(Bool.toBool('data') === true).toBe(true)
      expect(Bool.toBool({}) === true).toBe(true)
      expect(Bool.toBool([]) === true).toBe(true)
    })

    it('should convert falsy values to false', () => {
      expect(Bool.toBool(false) === false).toBe(true)
      expect(Bool.toBool('false') === false).toBe(true)
      expect(Bool.toBool('') === false).toBe(true)
      expect(Bool.toBool(0) === false).toBe(true)
      expect(Bool.toBool('0') === false).toBe(true)
      expect(Bool.toBool(null) === false).toBe(true)
      expect(Bool.toBool(undefined) === false).toBe(true)
      expect(Bool.toBool(NaN) === false).toBe(true)
    })

  })


})