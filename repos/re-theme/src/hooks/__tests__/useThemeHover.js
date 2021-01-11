/* eslint-disable no-unused-vars */

jest.resetModules()
jest.resetAllMocks()

const { useThemeState } = require('../useThemeState')

const mockHookFactory = jest.fn((...args) => useThemeState(...args))
jest.setMock('../useThemeState', { useThemeState: mockHookFactory })

describe('useThemeHover', () => {
  it('should call useThemeState', () => {
    mockHookFactory.mockClear()
    const { useThemeHover } = require('../useThemeHover')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeHover } = require('../useThemeHover')
    const arg = mockHookFactory.mock.calls[0][0]
    expect(arg).toBe('hover')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeHover } = require('../useThemeHover')
    expect(typeof useThemeHover).toBe('function')
  })
})
