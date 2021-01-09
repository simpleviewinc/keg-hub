/* eslint-disable no-unused-vars */

jest.resetModules()
jest.resetAllMocks()

const { useThemeState } = require('../useThemeState')

const mockHookFactory = jest.fn((...args) => useThemeState(...args))
jest.setMock('../useThemeState', { useThemeState: mockHookFactory })

describe('useThemeFocus', () => {
  it('should call useThemeState', () => {
    mockHookFactory.mockClear()
    const { useThemeFocus } = require('../useThemeFocus')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeFocus } = require('../useThemeFocus')
    const arg = mockHookFactory.mock.calls[0][0]
    expect(arg).toBe('focus')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeFocus } = require('../useThemeFocus')
    expect(typeof useThemeFocus).toBe('function')
  })
})
