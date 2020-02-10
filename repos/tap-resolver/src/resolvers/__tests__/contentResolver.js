const { appConfig } = require('../../mocks')
const path = require('path')

// Helpers to allow calling the setup function in a test env
const aliasMap = { 
  ...appConfig.keg.tapResolver.aliases,
  ['TestTap']: '/preceding/tap/path'
}
const contentType = "components/assets"
const content = Object.freeze({
  basePath: "testBasePath/",
  extensions: [".js"]
})

// Mock the called functions for testing
jest.mock('fs', () => ({
  existsSync: (myPath) => !myPath.includes('use/base/path') && !myPath.includes('check/extensions'),
  lstatSync: (myPath) => ({ isDirectory: () => {
    const exists = myPath.includes('directory')
    if (!exists)
      throw new Error('boom')
    return exists
  }})
}))


// Module to test
// Helper to re-require the content resolver, and auto return the child resolver function
const getContentResolver = (...params) => {
  return require('../contentResolver')(...params)
}

describe('resolve content path', () => {

  describe('params (appConfig)', () => {
    it('should fail if appConfig is null', () => {
      expect(() => contentResolver(null, aliasMap, content, contentType)).toThrow(Error)
    })
  })

  describe('the returned resolver function', () => {
    it('should return the full path to the resolved file', () => {
      const resolverFn = getContentResolver(appConfig, aliasMap, content, contentType)
      const mockMatchResults = ["my/cool/path/rocks.js", "/cool/path/rocks.js"]
      const expectedPath = path.join(aliasMap['TestTap'], contentType, mockMatchResults[1])
      const fullPath = resolverFn(mockMatchResults)
      expect(fullPath).toBe(expectedPath)
    })

    it('should resolve a path to an index.js file if the match result points to a folder', () => {
      const dirPath = "/cool/directory" // mock of lstatSync().isDirectory returns true when directory is in the string
      const mockMatchResults = [null, dirPath]
      const resolverFn = getContentResolver(appConfig, aliasMap, content, contentType)
      const expectedPath = path.join(aliasMap['TestTap'], contentType, mockMatchResults[1], "index")
      const fullPath = resolverFn(mockMatchResults)

      expect(fullPath).toBe(expectedPath)
    })

    it('should resolve a path that begins with the default basePath if the tap file did not exist', () => {
      const thePath = "/cool/use/base/path" // mock of existsSync returns false when use/base/path is in the string
      const mockMatchResults = [null, thePath]
      const resolverFn = getContentResolver(appConfig, aliasMap, content, contentType)
      const expectedPath = path.join(content.basePath, contentType, mockMatchResults[1])
      const fullPath = resolverFn(mockMatchResults)

      expect(fullPath).toBe(expectedPath)
    })

  })
})
