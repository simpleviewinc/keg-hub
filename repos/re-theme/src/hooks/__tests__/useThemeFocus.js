jest.resetModules()
jest.resetAllMocks()

const { hookFactory } = require('../hookFactory')

const mockHookFactory = jest.fn((...args) => hookFactory(...args))
jest.setMock('../hookFactory', { hookFactory: mockHookFactory })

describe('useThemeFocus', () => {

  it('should call hookFactory', () => {
    mockHookFactory.mockClear()
    const { useThemeFocus } = require('../useThemeFocus')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeFocus } = require('../useThemeFocus')
    const args = mockHookFactory.mock.calls[0][0]
    expect(args.on).toBe('focus')
    expect(args.off).toBe('blur')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeFocus } = require('../useThemeFocus')
    expect(typeof useThemeFocus).toBe('function')
  })

})
