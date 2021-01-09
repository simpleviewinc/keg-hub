/* eslint-disable no-unused-vars */

jest.resetModules()
jest.resetAllMocks()

const { useThemeState } = require('../useThemeState')

const mockHookFactory = jest.fn((...args) => useThemeState(...args))
jest.setMock('../useThemeState', { useThemeState: mockHookFactory })

describe('useThemeActive', () => {
  it('should call useThemeState', () => {
    mockHookFactory.mockClear()
    const { useThemeActive } = require('../useThemeActive')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeActive } = require('../useThemeActive')
    const arg = mockHookFactory.mock.calls[0][0]
    expect(arg).toBe('active')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeActive } = require('../useThemeActive')
    expect(typeof useThemeActive).toBe('function')
  })
})
