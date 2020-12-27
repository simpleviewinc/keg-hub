jest.resetModules()
jest.resetAllMocks()

jest.setMock('../../hooks/useTheme', { useTheme: jest.fn() })
jest.setMock('../../theme/themeEvent', { addThemeEvent: jest.fn() })

const { createBlock, convertToCss } = require('../useStyleTag')

describe('useStyleTag', () => {
  describe('createBlock', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it(`should convert a style object into a style string`, () => {
      expect(createBlock({ color: '#111' })).toBe(`{color:rgba(17,17,17,1.00)}`)
    })

    it(`should convert with multiple values`, () => {
      expect(createBlock({ color: '#111', height: '50%' })).toBe(
        `{color:rgba(17,17,17,1.00);height:50%}`
      )
    })

    it(`should convert camel case to train case`, () => {
      expect(createBlock({ backgroundColor: '#111', fontSize: 12 })).toBe(
        `{background-color:rgba(17,17,17,1.00);font-size:12px}`
      )
    })

    it(`should return empty styles when no styles are passed`, () => {
      expect(createBlock()).toBe('{}')
    })

    it(`should return empty styles when an object is not passed`, () => {
      expect(createBlock('')).toBe('{}')
      expect(createBlock(1)).toBe('{}')
      expect(createBlock([])).toBe('{}')
    })
  })

  describe('convertToCss', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it(`should return an object with a blocks key and value or array`, () => {
      const styles = convertToCss({ color: '#111', height: '50%' })
      expect(Array.isArray(styles.blocks)).toBe(true)
    })

    it(`should add the convert styles to the blocks array`, () => {
      const styles = convertToCss({ color: '#111', height: '50%' })
      expect(styles.blocks[0]).toBe(`{color:rgba(17,17,17,1.00);height:50%}`)
    })

    it(`should accept styles as an array and convert each one to a string`, () => {
      const styles = convertToCss([
        { color: '#111', height: '50%' },
        { backgroundColor: '#111', fontSize: 12 },
      ])
      expect(styles.blocks[0]).toBe(`{color:rgba(17,17,17,1.00);height:50%}`)
      expect(styles.blocks[1]).toBe(
        `{background-color:rgba(17,17,17,1.00);font-size:12px}`
      )
    })

    it(`should not throw when passed in array contains a non-object`, () => {
      const styles = convertToCss([
        'should-not-throw',
        { color: '#111', height: '50%' },
        { backgroundColor: '#111', fontSize: 12 },
      ])
      expect(styles.blocks[0]).toBe(`{color:rgba(17,17,17,1.00);height:50%}`)
      expect(styles.blocks[1]).toBe(
        `{background-color:rgba(17,17,17,1.00);font-size:12px}`
      )
    })
  })
})
