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

  })

  // describe('convertToCss', () => {

  //   afterEach(() => {
  //     jest.clearAllMocks()
  //   })


  // })

})