jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const mockConsumer = jest.fn()
const mockProvider = jest.fn()

const createContext = jest.fn(value => {
  return { Consumer: mockConsumer, Provider: mockProvider }
})

jest.setMock('react', { createContext })

const { HeadContext, Consumer, Provider } = require('../headContext')

describe('HeadContext', () => {

  it('should create a react context object', () => {
    expect(createContext).toHaveBeenCalled()
  })

  it('should export the HeadContext', () => {
    expect(HeadContext.Consumer).toBe(mockConsumer)
    expect(HeadContext.Provider).toBe(mockProvider)
  })

  it('should export the context Consumer and Provider', () => {
    expect(Consumer).toBe(mockConsumer)
    expect(Provider).toBe(mockProvider)
  })

})
