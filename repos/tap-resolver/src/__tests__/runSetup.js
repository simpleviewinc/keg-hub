const { options } = require('../mocks')
const { isArr, isFunc } = require('jsutils')

// Helpers to allow calling the setup function in a test env
const buildAliases = jest.fn(() => { return jest.fn() })
const buildConstants = jest.fn(() => { return { EXTENSIONS: { assets: [], resolve: [] } } })
const validateApp = jest.fn(() => { return true })
const resolver = () => ""
const defResolver = () => ""

// Mock the called functions for testing
jest.setMock('../builders/buildAliases', buildAliases)
jest.setMock('../builders/buildConstants', buildConstants)
jest.setMock('../helpers', { validateApp })
jest.setMock('../resolvers/contentResolver', defResolver)

// Module to test
const runSetup = require('../runSetup')

describe('runSetup', () => {
  
  beforeEach(() => {
    validateApp.mockClear()
    buildConstants.mockClear()
    buildAliases.mockClear()
  })

  it('should call the validateApp method', () => {

    runSetup(options, resolver)

    expect(validateApp).toHaveBeenCalledWith(options.kegPath, options.config)

  })

  it('should call the buildConstants method', () => {

    runSetup(options, resolver)

    expect(buildConstants).toHaveBeenCalledWith(options)

  })

  it('should call the buildAliases method', () => {

    runSetup(options, resolver)

    expect(buildAliases).toHaveBeenCalled()

  })

  it('should use the default content resolver, when one is not passed in', () => {

    runSetup(options)

    expect(buildAliases.mock.calls[0][1]).toBe(defResolver)

  })

  it('should use the passed in content resolver, when one is passed in', () => {

    runSetup(options, resolver)

    expect(buildAliases.mock.calls[0][1]).toBe(resolver)

  })

  it('should return extensions and buildAlias function', () => {

    const { EXTENSIONS, buildAliases } = runSetup(options, resolver)

    expect(isArr(EXTENSIONS.assets)).toBe(true)
    expect(isArr(EXTENSIONS.resolve)).toBe(true)
    expect(isFunc(buildAliases)).toBe(true)

  })

})
