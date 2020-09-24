jest.resetModules()
jest.resetAllMocks()

const { hookFactory } = require('../hookFactory')

const mockHookFactory = jest.fn((...args) => hookFactory(...args))
jest.setMock('../hookFactory', { hookFactory: mockHookFactory })

describe('useThemeHover', () => {

  it('should call hookFactory', () => {
    mockHookFactory.mockClear()
    const { useThemeHover } = require('../useThemeHover')
    expect(mockHookFactory).toHaveBeenCalled()
  })

  it('should pass the correct arguments', () => {
    const { useThemeHover } = require('../useThemeHover')
    const args = mockHookFactory.mock.calls[0][0]
    expect(args.on).toBe('pointerover')
    expect(args.off).toBe('pointerout')
  })

  it('should export as a function', () => {
    mockHookFactory.mockClear()
    const { useThemeHover } = require('../useThemeHover')
    expect(typeof useThemeHover).toBe('function')
  })

})
