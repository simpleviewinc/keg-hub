const { options, webResolver } = require('../../mocks')
const path = require('path')
const testResolver = require('../../resolvers/testResolver')

// Helpers to allow calling the setup function in a test env
const checkTapKegPath = jest.fn((_, __, resolverPath) => {
  return path.join(options.kegPath, resolverPath)
})

// Mock the called functions for testing
jest.setMock('../../helpers', { checkTapKegPath })

// Module to test
const setupBabel = require('../setupBabel')

describe('setupBabel', () => {
  
  beforeEach(() => {
    checkTapKegPath.mockClear()
  })

  describe('getPlatformData', () => {

    beforeEach(() => {
      checkTapKegPath.mockClear()
    })

    it('should return the correct platform babel config', () => {

      const webRes = setupBabel.getPlatformData({ ...options, isWeb: true }, 'babel')
      const nativeRes = setupBabel.getPlatformData({ ...options, isWeb: false }, 'babel')

      expect(webRes.presets[0]).toBe('babel-expo-web')
      expect(nativeRes.presets[0]).toBe('babel-expo-native')

    })

    it('should return the default data when no platform type is defined in the config', () => {

      const webRes = setupBabel.getPlatformData({ ...options, isWeb: true }, 'aliases')
      const nativeRes = setupBabel.getPlatformData({ ...options, isWeb: false }, 'aliases')

      expect(webRes).toBe(nativeRes)

    })

  })

  describe('getResolverFile', () => {

    beforeEach(() => {
      checkTapKegPath.mockClear()
    })

    it('should not call checkTapKegPath when no resolver is set in the config', () => {

      setupBabel.getResolverFile(options, 'contentResolver')
      expect(checkTapKegPath).not.toHaveBeenCalled()

    })

    it('should call checkTapKegPath when a resolver is set in the config', () => {

      const oldLog = console.log
      console.log = jest.fn()
      setupBabel.getResolverFile(options, 'webResolver')

      expect(checkTapKegPath).toHaveBeenCalled()

      console.log = oldLog

    })

    it('should return the loaded resolve file when it valid', () => {

      const oldLog = console.log
      console.log = jest.fn()
      const response = setupBabel.getResolverFile(options, 'webResolver')

      expect(response).toBe(webResolver)

      console.log = oldLog

    })

    it('should not throw when a path is set but does not exist', () => {

      const oldErr = console.error
      console.error = jest.fn()
      const oldLog = console.log
      console.log = jest.fn()

      expect(() => { setupBabel.getResolverFile(options, 'testResolver') }).not.toThrow()

      console.error = oldErr
      console.log = oldLog

    })


    it('should log an error when a path is set but does not exist', () => {

      const oldErr = console.error
      console.error = jest.fn()
      const oldLog = console.log
      console.log = jest.fn()
      setupBabel.getResolverFile(options, 'testResolver')

      expect(console.error).toHaveBeenCalled()

      console.error = oldErr
      console.log = oldLog

    })

    it('should load the default resolver when a path is set but does not exist', () => {

      const oldErr = console.error
      console.error = jest.fn()
      const oldLog = console.log
      console.log = jest.fn()
      const response = setupBabel.getResolverFile(options, 'testResolver')

      expect(response).toBe(testResolver)

      console.error = oldErr
      console.log = oldLog

    })

  })



})
