jest.resetModules()
jest.resetAllMocks()

const { hookFactory } = require('../hookFactory')

const mockHookFactory = jest.fn((...args) => hookFactory(...args))
jest.setMock('../hookFactory', { hookFactory: mockHookFactory })

describe('useThemeActive', () => {

  it('should call hookFactory', () => {
    mockHookFactory.mockClear()
    const { useThemeActive } = require('../useThemeActive')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeActive } = require('../useThemeActive')
    const args = mockHookFactory.mock.calls[0][0]
    expect(args.on).toBe('mousedown')
    expect(args.off).toBe('mouseup')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeActive } = require('../useThemeActive')
    expect(typeof useThemeActive).toBe('function')
  })

})
