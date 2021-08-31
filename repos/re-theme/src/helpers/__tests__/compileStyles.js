import { buttonTheme, deeplyNestedTheme, testTheme } from '../../mocks'
import * as Dimensions from '../../dimensions'
import { fireThemeEvent } from '../../theme/themeEvent'
import { compileStylesForState } from '../compileStyles'
import { getSizeMap } from '../../dimensions'

const sizeMap = getSizeMap()

jest.resetModules()

const Dims = {
  getMergeSizes: jest.fn(Dimensions.getMergeSizes),
  getSize: jest.fn(Dimensions.getSize),
  getSizeMap: jest.fn(Dimensions.getSizeMap),
}

const themeEvent = { fireThemeEvent: jest.fn(fireThemeEvent) }

jest.setMock('../../theme/themeEvent', themeEvent)
jest.setMock('../../dimensions', Dims)

describe('Helpers', () => {
  describe('compileStyles', () => {
    afterEach(() => jest.clearAllMocks())

    it('should return the built theme object', () => {
      const theme = compileStylesForState(buttonTheme, 200, 1000)

      expect(typeof theme).toBe('object')
    })

    it('should work with a theme containing deeply nested size keys', () => {
      const mediumSize = 770
      const theme = compileStylesForState(
        deeplyNestedTheme,
        mediumSize,
        1000,
        {}
      )
      expect(
        theme.button.contained.default.active.main.backgroundColor
      ).toEqual('orange')
    })

    it('should add the RTMeta key to the theme object when withMeta is true', () => {
      const theme = compileStylesForState(buttonTheme, 200, 1000, true)

      expect(typeof theme.RTMeta).toBe('object')
    })

    it('should add the get function to the theme object when withMeta is true', () => {
      expect(typeof buttonTheme.get).toBe('undefined')

      const theme = compileStylesForState(
        buttonTheme,
        sizeMap.hash['$small'],
        1000,
        true
      )

      expect(typeof theme.get).toBe('function')
    })

    it('should just return the passed in theme when its not an object', () => {
      expect(compileStylesForState(null)).toBe(null)
      expect(compileStylesForState(1)).toEqual(1)
      expect(compileStylesForState('')).toEqual('')

      const arrTheme = []
      expect(compileStylesForState(arrTheme)).toEqual(arrTheme)

      expect(Dims.getSize).not.toHaveBeenCalled()
    })

    it('should compile styles with sizes and platforms', () => {
      const compiled = compileStylesForState(
        testTheme,
        sizeMap.hash['$small'] + 10,
        1000
      )

      expect(compiled.components.button.width).toEqual(
        testTheme.$small.components.button.width
      )

      expect(compiled.components.button.default.fontSize).toEqual(
        testTheme.components.button.default.$web.$small.fontSize
      )

      expect(compiled.components.button.default.padding).toEqual(
        testTheme.components.button.default.$web.padding
      )
    })

    it('should compile shortcuts', () => {
      const compiled = compileStylesForState(
        { p: 10, $small: { c: 'blue' }, $large: { c: 'green' } },
        sizeMap.hash['$small'] + 10,
        1000
      )

      expect(compiled).toEqual({
        padding: 10,
        color: 'blue',
      })
    })
  })
})
