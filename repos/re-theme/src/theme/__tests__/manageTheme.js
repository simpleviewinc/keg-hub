jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const { getCurrentTheme, updateCurrentTheme } = require('../manageTheme')

describe('manageTheme', () => {
  describe('updateCurrentTheme', () => {
    afterEach(() => {
      updateCurrentTheme({})
    })

    it('should override the default Theme', () => {
      const testTheme = {}
      const defTheme = getCurrentTheme()

      expect(defTheme).not.toBe(testTheme)

      updateCurrentTheme(testTheme)

      expect(getCurrentTheme()).toBe(testTheme)
    })
  })

  describe('getCurrentTheme', () => {
    it('should return the default Theme, when no theme is set', () => {
      const defTheme = getCurrentTheme()

      expect(typeof defTheme).toBe('object')
    })

    afterEach(() => {
      updateCurrentTheme({})
    })
  })
})
