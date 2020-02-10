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

const themeEvent = { fireThemeEvent: jest.fn(fireThemeEvent) }

jest.setMock('../themeEvent', themeEvent)
jest.setMock('../../dimensions', Dims)

let themeClone = deepClone(testTheme)

const Theme = require('../buildTheme')

describe('Theme', () => {

  describe('buildTheme', () => {

    afterEach(() => jest.clearAllMocks())

    it('should return the built theme object', () => {

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(typeof theme).toBe('object')

    })

    it('should add the RTMeta key to the theme object', () => {

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(typeof theme.RTMeta).toBe('object')

    })

    it('should add the join function to the theme object', () => {

      expect(typeof buttonTheme.join).toBe('undefined')

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(typeof theme.join).toBe('function')

    })

    it('should add the get function to the theme object', () => {

      expect(typeof buttonTheme.get).toBe('undefined')

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(typeof theme.get).toBe('function')

    })

    it('should make call to get the current size using the passed in width', () => {

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(Dims.getSize).toHaveBeenCalledWith(200)

    })

    it('should fire off a theme built event', () => {

      const theme = Theme.buildTheme(buttonTheme, 200, 1000, {})

      expect(themeEvent.fireThemeEvent).toHaveBeenCalled()

    })

    it('should just return the passed in theme when its not an object', () => {

      expect(Theme.buildTheme(null)).toBe(null)
      expect(Theme.buildTheme(1)).toEqual(1)
      expect(Theme.buildTheme("")).toEqual("")
      

      const arrTheme = []
      expect(Theme.buildTheme(arrTheme)).toEqual(arrTheme)

      expect(Dims.getSize).not.toHaveBeenCalled()

    })

  })

})
