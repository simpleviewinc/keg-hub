import { testTheme as theme } from '../../mocks'
import { isObj, get } from '@keg-hub/jsutils'

jest.resetModules()

const manageMock = { getCurrentTheme: jest.fn(() => theme) }
jest.setMock('../../theme/manageTheme', manageMock)

const { getTheme } = require('../getTheme')

describe('getTheme', () => {
  describe('getTheme', () => {
    afterEach(() => jest.clearAllMocks())

    it('should return an object', () => {
      const styles = getTheme(['components', 'button', 'default'], {
        width: 200,
        height: 40,
      })

      expect(isObj(styles)).toBe(true)
      expect(isObj(getTheme())).toBe(true)
      expect(isObj(getTheme(null))).toBe(true)
      expect(isObj(getTheme(true))).toBe(true)
      expect(isObj(getTheme(''))).toBe(true)
    })

    it('should return a joined styles object', () => {
      const styles = getTheme(['components', 'button', 'default'], {
        width: 200,
        height: 40,
      })

      expect(get(theme, 'components.button.default.width')).toBe(undefined)
      expect(get(theme, 'components.button.default.height')).toBe(undefined)

      expect(styles.width).toBe(200)
      expect(styles.height).toBe(40)
      expect(styles['$web'].padding).toBe(8)
    })

    it('should join the passed in items, with last overwriting first', () => {
      const styles = getTheme(
        ['components', 'button', 'default'],
        { width: 30, height: 40, $web: { padding: 20 } },
        { width: 200, height: 0 }
      )

      expect(get(theme, 'components.button.default.$web.width')).toBe(undefined)

      expect(styles.width).toBe(200)
      expect(styles.height).toBe(0)
      expect(styles['$web'].padding).toBe(20)
    })

    it('should pull paths from the theme when a string or array is passed in', () => {
      const styles = getTheme(
        ['components', 'button', 'default', '$web'],
        'components.button.default.$native',
        { fontSize: 40 }
      )

      expect(get(theme, 'components.button.default.$web.color')).toBe('#ffffff')
      expect(get(theme, 'components.button.default.$web.padding')).toBe(8)
      expect(get(theme, 'components.button.default.$native.padding')).toBe(12)
      expect(get(theme, 'components.button.default.$web.fontSize')).toBe(14)
      expect(get(theme, 'components.button.default.$native.fontSize')).toBe(12)

      expect(styles.color).toBe('#ffffff')
      expect(styles.padding).toBe(12)
      expect(styles.fontSize).toBe(40)
    })

    it('should call getCurrentTheme to get the latest theme', () => {
      expect(manageMock.getCurrentTheme).not.toHaveBeenCalled()

      getTheme(['components', 'button', 'default'], {})

      expect(manageMock.getCurrentTheme).toHaveBeenCalled()
    })
  })
})
