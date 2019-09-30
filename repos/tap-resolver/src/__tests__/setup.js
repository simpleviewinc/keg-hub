const path = require('path')
const { get } = require('jsutils')
const appConfig = Object.freeze(require('./app.json'))
const { FS } = require('../../mocks')

// Helpers to allow calling the setup function in a test env
const testTapName = "test"
const testAppRoot = path.join(__dirname, "../../")
const tapConfig = require(`../../taps/${testTapName}/app.json`)
const buildAliases = jest.fn(() => { return {} })
const buildConstants = jest.fn(() => { return {} })
const getAppConfig = jest.fn(() => { return appConfig })
const resolver = () => ""

// Mock the called functions for testing
jest.setMock('fs', FS)
jest.setMock('../buildAliases', buildAliases)
jest.setMock('../buildConstants', buildConstants)
jest.setMock('../getAppConfig', getAppConfig)

// Module to test
const Setup = require('../setup')

describe('Setup', () => {
  
  beforeEach(() => {
    getAppConfig.mockClear()
    buildConstants.mockClear()
    buildAliases.mockClear()
  })

  describe('params', () => {

    it('should call the getAppConfig when no config is passed in', () => {
      Setup(testAppRoot, null, resolver, null)
      expect(getAppConfig).toHaveBeenCalled()
    })

    it('should NOT call the getAppConfig when a config is passed in', () => {
      Setup(testAppRoot, appConfig, resolver, null)
      expect(getAppConfig).not.toHaveBeenCalled()
    })

  })

  describe('Internal function calls', () => {

    it('should call the buildConstants method', () => {
      const tapName = null
      Setup(testAppRoot, appConfig, resolver, tapName)

      expect(buildConstants).toHaveBeenCalledWith(testAppRoot, appConfig, tapName)
    })

    it('should call the buildAliases method', () => {
      Setup(testAppRoot, appConfig, resolver, null)

      expect(buildAliases).toHaveBeenCalled()
    })

  })

})
