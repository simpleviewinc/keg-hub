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

// tests helper that verifies dynamic keys aren't present in final styles object
const assertNoDynamicKeys = styles => {
  const styleKeys = Object.keys(styles)
  expect(styleKeys).not.toContain('$xsmall')
  expect(styleKeys).not.toContain('$small')
  expect(styleKeys).not.toContain('$medium')
  expect(styleKeys).not.toContain('$large')
  expect(styleKeys).not.toContain('$web')
  expect(styleKeys).not.toContain('$native')
  expect(styleKeys).not.toContain('$ios')
  expect(styleKeys).not.toContain('$android')
}

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

      assertNoDynamicKeys(theme)
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

      assertNoDynamicKeys(compiled)
    })

    it('should compile size keys', () => {
      const style = {
        $xsmall: {
          padding: 20,
        },
        $large: {
          padding: 10,
        },
        $small: {
          padding: 15,
        },
      }

      const propsStyle = { margin: 12 }
      const compiledStyles = compileStylesForState({ ...style, ...propsStyle}, sizeMap.hash.$large, 1000)
      expect(compiledStyles).toEqual(
        expect.objectContaining({
          padding: style['$large'].padding,
          ...propsStyle,
        })
      )
      assertNoDynamicKeys(compiledStyles)
    })

    it('should compile platform keys', () => {
      const style = {
        $all: {
          $large: {
            borderTop: 10,
            c: 'red',
          },
          $small: {
            padding: 10,
          },
        },
        $web: {
          $xsmall: {
            padding: 20,
          },
          $large: {
            padding: 10,
            c: 'blue',
          },
          $small: {
            padding: 15,
          },
        },
        $native: {
          $large: {
            padding: 0,
          },
        },
      }
      const propsStyle = { margin: 12 }
      const compiledStyles = compileStylesForState({ ...style, ...propsStyle}, sizeMap.hash.$large, 1000)
      expect(compiledStyles).toEqual(
        expect.objectContaining({
          padding: style.$web.$large.padding,
          color: style.$web.$large.c,
          borderTop: style.$all.$large.borderTop,
          ...propsStyle,
        })
      )
      assertNoDynamicKeys(compiledStyles)
    })

    it('should compile shortcuts', () => {
      const style = {
        p: 20,
        mT: 10,
      }
      const propsStyle = { mB: 12 }
      const compiledStyles = compileStylesForState({ ...style, ...propsStyle}, sizeMap.hash.$large, 1000)
      expect(compiledStyles).toEqual(
        expect.objectContaining({
          padding: style.p,
          marginTop: style.mT,
          marginBottom: propsStyle.mB,
        })
      )
      assertNoDynamicKeys(compiledStyles)
      expect(Object.keys(compiledStyles)).not.toContain('mT')
      expect(Object.keys(compiledStyles)).not.toContain('mB')
      expect(Object.keys(compiledStyles)).not.toContain('p')
    })

    it('should maintain existing object structure', () => {
      const style = {
        component: {
          p: 20,
          mT: 10,
        },
      }
      const propsStyle = { mB: 12 }
      const compiledStyles = compileStylesForState({ ...style, ...propsStyle}, sizeMap.hash.$large, 1000)
      expect(compiledStyles).toEqual(
        expect.objectContaining({
          component: {
            padding: style.component.p,
            marginTop: style.component.mT,
          },
          marginBottom: propsStyle.mB,
        })
      )
    })
  })
})
