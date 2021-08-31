import { testTheme, TestDimensions } from '../../mocks'
import { deepClone } from '@keg-hub/jsutils'
import * as Dimensions from '../../dimensions'

jest.resetModules()

const Dims = {
  getMergeSizes: jest.fn(Dimensions.getMergeSizes),
  getSize: jest.fn(Dimensions.getSize),
  setSizes: jest.fn(Dimensions.getSizes),
  getSizeMap: jest.fn(Dimensions.getSizeMap),
}
const buildTheme = jest.fn(theme => theme)

jest.setMock('../../dimensions', Dims)
jest.setMock('../buildTheme', { buildTheme })
jest.setMock('../../dimensions/dimensions', { Dimensions: TestDimensions })

let themeClone = deepClone(testTheme)

const Theme = require('../default')

describe('Theme', () => {
  describe('getDefaultTheme', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should get the default theme', () => {
      const defTheme = Theme.getDefaultTheme()
      expect(typeof defTheme).toBe('object')
      expect(defTheme).not.toBe(themeClone)

      const setTheme = Theme.setDefaultTheme(themeClone)

      expect(Theme.getDefaultTheme()).toBe(setTheme)
    })
  })

  describe('setDefaultTheme', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return the updated default theme object', () => {
      expect(Theme.setDefaultTheme(themeClone)).toEqual(themeClone)
    })

    it('should log a warning if an object is not passed as the first argument', () => {
      const oldErr = console.warn
      console.warn = jest.fn()

      Theme.setDefaultTheme('')

      expect(console.warn).toHaveBeenCalled()

      console.warn = oldErr
    })

    it('should only merge with current default theme if second argument is true', () => {
      const defTheme = { test: { foo: 'bar' }, data: [1] }
      const defTheme2 = { test: { foo: 'baz' } }
      Theme.setDefaultTheme(defTheme)
      Theme.setDefaultTheme(defTheme2)
      const theme = Theme.getDefaultTheme()

      expect(theme.data).toBe(undefined)

      Theme.setDefaultTheme(defTheme)
      Theme.setDefaultTheme(defTheme2, true)

      const theme2 = Theme.getDefaultTheme()
      expect(theme2.data).toEqual(defTheme.data)
    })
  })
})
