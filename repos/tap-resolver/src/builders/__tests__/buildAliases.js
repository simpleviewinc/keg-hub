const { config } = require('../../mocks')

// Helpers to allow calling the setup function in a test env
const aliasMap = {
  ...config.keg.tapResolver.aliases,
  TestTap: '/preceding/tap/path'
}

const baseKey = 'base_key'
const dynamicKey = 'dynamic_key'

let content = null
const buildContentObj = () => {
  return {
    basePath: "testBasePath/",
    extensions: [".js"],
    base: {
      [baseKey]: '/you/cant/override/me'
    },
    dynamic: {
      [dynamicKey]: '/my/overridable/path'
    },
    tap: true
  }
}

// Module to test
const buildAliases = require('../buildAliases')

describe('Build Aliases', () => {

  beforeEach(() => {
    global.testMocks.fs = { stat: true, exists: true }
    content = buildContentObj()
  })
  
  describe('param - config', () => {

    it('should throw an error if first param (config) is not an object', () => {
      expect(() => buildAliases(null, () => "", aliasMap, content)).toThrow(Error)
    })
    
    it('should NOT throw an error if first param (config) is an object', () => {
      expect(() => buildAliases({}, () => "", aliasMap, content)).not.toThrow(Error)
    })

  })

  describe('calling the function', () => {

    it('should return a function when valid params are passed in', () => {
      expect(typeof buildAliases({}, () => "", aliasMap, content)).toBe('function')
    })

  })

  describe('Returned buildAliases child function', () => {

    it('should use the base path for every dynamic alias if the tap is undefined', () => {
      content.tap = null
      const finalAliasMap = buildAliases(config, null, aliasMap, content)()

      Array.from([baseKey, dynamicKey])
        .forEach(key => {
          expect(finalAliasMap[key]).toContain(content.basePath)
        })
    })

    it('should NOT call the passed in resolver if tap is falsy', () => {
      content.tap =  false
      const resolvedDir = "/used/the/resolver"
      const testResolver = jest.fn((a, b, c, somePath) => (resolvedDir + somePath)) 
      buildAliases(config, testResolver, aliasMap, content)()

      expect(testResolver).not.toHaveBeenCalled()
    })

    it('should NOT throw if passed in resolver if its not a function', () => {
      content.tap =  true

      expect(buildAliases(config, null, aliasMap, content)).not.toThrow(Error)
    })

    it('should NOT call the passed in resolver if no dynamic aliases exist', () => {
      content.tap =  false
      const resolvedDir = "/used/the/resolver"
      const testResolver = jest.fn((a, b, c, somePath) => (resolvedDir + somePath))
      const noDynamic = { ...content, dynamic: {} }
      buildAliases(config, testResolver, aliasMap, content)()

      expect(testResolver).not.toHaveBeenCalled()
    })

    it('should call the passed in resolver function if tap is true', () => {
      content.tap =  true
      const resolvedDir = "/used/the/resolver"
      const testResolver = jest.fn((a, b, c, somePath) => (resolvedDir + somePath)) 
      buildAliases(config, testResolver, aliasMap, content)()

      expect(testResolver).toHaveBeenCalled()
    })

    it('should resolve the dynamic alias paths using the contentResolver if the tap is defined', () => {
      content.tap =  true
      const resolvedDir = "/used/the/resolver"
      const testResolver = (a, b, c, somePath) => (resolvedDir + somePath)
      const finalAliasMap = buildAliases(config, testResolver, aliasMap, content)()

      expect(finalAliasMap[dynamicKey]).toContain(resolvedDir)
    })

  })
})
