jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { setRNPlatform, getRNPlatform } = require('../platform')

describe('platform', () => {
  describe('setRNPlatform', () => {
    afterEach(() => {
      setRNPlatform(undefined)
    })

    it('should override the default RNPlatform', () => {
      const testRNPlatform = {}
      const defPlatform = getRNPlatform()

      expect(defPlatform).not.toBe(testRNPlatform)

      setRNPlatform(testRNPlatform)

      expect(getRNPlatform()).toBe(testRNPlatform)
    })
  })

  describe('getRNPlatform', () => {
    it('should return the default RNPlatform, when no platform is set', () => {
      const defPlatform = getRNPlatform()

      expect(typeof defPlatform).toBe('object')
      expect(defPlatform.OS).toBe('web')
      expect(typeof defPlatform.select).toBe('function')
      expect(defPlatform.Version).toBe('ReTheme')
    })

    afterEach(() => {
      setRNPlatform(undefined)
    })
  })

  describe('Platform.select', () => {
    it('should select the correct key from an object based on platform', () => {
      const defPlatform = getRNPlatform()
      expect(
        defPlatform.select({ native: 'I am native', web: 'I am web' })
      ).toBe('I am web')
    })

    afterEach(() => {
      setRNPlatform(undefined)
    })
  })
})
