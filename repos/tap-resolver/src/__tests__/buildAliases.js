const appJson = require('./app.json')
const { FS } = require('../../mocks')

jest.setMock('fs', FS)

const buildAliases = require('../buildAliases')

describe('Build Aliases', () => {
  const aliasMap = { 
    ...appJson.clientResolver.aliases,
    TestClient: '/preceding/client/path'
  }
  const contentType = "components/assets"
  const baseKey = 'base_key'
  const dynamicKey = 'dynamic_key'
  let content = null
  
  beforeEach(() => {
    global.testMocks.fs = { stat: true, exists: true }
    content = {
      basePath: "testBasePath/",
      extensions: [".js"],
      base: {
        [baseKey]: '/you/cant/override/me'
      },
      dynamic: {
        [dynamicKey]: '/my/overridable/path'
      },
      client: true
    }
  })
  
  it('should fail if appConfig is null', () => {
    expect(() => buildAliases(null, () => "", aliasMap, content)).toThrow(Error)
  })

  describe('the returned function', () => {
    it('should use the base path for every dynamic alias if the client is undefined', () => {
      content.client = null
      const finalAliasMap = buildAliases(appJson, null, aliasMap, content)();
      [baseKey, dynamicKey].forEach(key => {
        expect(finalAliasMap[key]).toContain(content.basePath)
      })
    })

    it('should resolve the dynamic alias paths using the contentResolver if the client is defined', () => {
      content.client =  true
      const resolvedDir = "/used/the/resolver"
      const testResolver = (a, b, c, somePath) => (resolvedDir + somePath)
      const finalAliasMap = buildAliases(appJson, testResolver, aliasMap, content)();
      expect(finalAliasMap[dynamicKey]).toContain(resolvedDir)
    })
  })
})
