const { appConfig } = require('../../mocks')
const path = require('path')
const { isFunc } = require('@keg-hub/jsutils')

// Helpers to allow calling the setup function in a test env
const aliasMap = {
  ...appConfig.keg.tapResolver.aliases,
  ['TestTap']: '/preceding/tap/path',
}
const contentType = 'components/assets'
const content = Object.freeze({
  basePath: 'testBasePath/',
  extensions: ['.js'],
})

// Mock the called functions for testing
jest.mock('fs', () => ({
  existsSync: myPath =>
    !myPath.includes('use/base/path') && !myPath.includes('check/extensions'),
  lstatSync: myPath => ({
    isDirectory: () => {
      const exists = myPath.includes('directory')
      if (!exists) throw new Error('boom')
      return exists
    },
  }),
}))

// Module to test
// Helper to re-require the content resolver, and auto return the child resolver function
const getComponentResolver = (...params) => {
  return require('../componentResolver')(...params)
}

describe('resolve content path', () => {
  describe('params (appConfig)', () => {
    it('should fail if appConfig is null', () => {
      expect(() =>
        getComponentResolver(null, aliasMap, content, contentType)
      ).toThrow(Error)
    })
  })

  describe('the returned resolver function', () => {
    it('should return the full path to the resolved file', () => {
      const resolverFn = getComponentResolver(
        appConfig,
        aliasMap,
        content,
        contentType
      )

      expect(isFunc(resolverFn)).toBe(true)

      const resolvedPath = resolverFn('TestTap', 'bar', 'TestTap')
      expect(resolvedPath).toEqual(path.join(aliasMap['TestTap'], contentType))
    })

    it('should include index when working with root paths', () => {
      const resolverFn = getComponentResolver(
        appConfig,
        aliasMap,
        content,
        contentType
      )

      const resolvedPath = resolverFn('TestTap', null, 'TestTap/index')
      expect(resolvedPath).toEqual(
        path.join(aliasMap['TestTap'], contentType, 'index')
      )
    })

    it('should resolve just the path to the alias ONLY, when its an alias path', () => {
      const resolverFn = getComponentResolver(
        appConfig,
        aliasMap,
        content,
        contentType
      )

      // should ignore /foo/bar, since the rollup alias plugin would resolve that part
      const resolvedPath = resolverFn('TestTap', null, 'TestTap/foo/bar')
      expect(resolvedPath).toEqual(path.join(aliasMap['TestTap'], contentType))
    })
  })
})
