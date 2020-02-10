import { testTheme, buttonTheme } from '../../mocks'
import { get, deepClone } from 'jsutils'
import * as Dimensions from '../../dimensions'
import { fireThemeEvent } from '../themeEvent'

jest.resetModules()

const Dims = {
  getMergeSizes: jest.fn(Dimensions.getMergeSizes),
  getSize: jest.fn(Dimensions.getSize),
  getSizeMap: jest.fn(Dimensions.getSizeMap),
}
const buildTheme = jest.fn(theme => (theme))

jest.setMock('../../dimensions', Dims)
jest.setMock('../buildTheme', { buildTheme })

let themeClone = deepClone(testTheme)

const Theme = require('../default')

describe('Theme', () => {

  describe('getDefaultTheme', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should get the default theme', () => {

      expect(typeof Theme.getDefaultTheme()).toBe('object')

      const defTheme = Theme.setDefaultTheme(themeClone)

      expect(Theme.getDefaultTheme()).toBe(defTheme)

    })

  })

  describe('setDefaultTheme', () => {

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return the updated default theme object', () => {

      expect(Theme.setDefaultTheme(themeClone)).toEqual(themeClone)

    })

    it('should call buildTheme', () => {

      Theme.setDefaultTheme(themeClone)

      expect(buildTheme).toHaveBeenCalled()

    })

    it('should log a warning if an object is not passed as the first argument', () => {

      const oldErr = console.warn
      console.warn = jest.fn()

      Theme.setDefaultTheme("")

      expect(console.warn).toHaveBeenCalled()

      console.warn = oldErr

    })

    it('should only merge with current default theme if second argument is true', () => {

      const defTheme = { test: { foo: 'bar' }, data: [ 1 ] }
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