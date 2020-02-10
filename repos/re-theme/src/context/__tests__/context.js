jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const defTheme = { test: 'test' }
const createContext = jest.fn(value => { return value })
const getDefaultTheme = jest.fn(() => { return defTheme })

jest.setMock('react', { createContext })
jest.setMock('../../theme/default', { getDefaultTheme })

const { ReThemeContext } = require('../context')

describe('ReThemeContext', () => {

  it('should return react context object', () => {
    expect(createContext).toHaveBeenCalled()
  })

  it('should pass in the default theme', () => {
    expect(getDefaultTheme).toHaveBeenCalled()
  })

  it('should use the correct theme', () => {
    expect(ReThemeContext).toEqual(defTheme)
  })

})