const { FS } = require('../../mocks')
const appJson = Object.freeze(require('./app.json'))
const path = require('path')

jest.setMock('fs', FS)

// mocks out use in setupClientConfig~cleanupOldTempConfig
jest.mock('rimraf', () => ({
  sync: () => true  
}))

const setupClient = require('../setupClient')
const testClientName = "testClient"
const clientConfig = require(`../../clients/${testClientName}/app.json`)

describe('Setup Client', () => {
  const testAppRoot = "../" // client-resolver root
  beforeEach(() => {
    global.testMocks.fs = { 
      stat: true, 
      exists: true,
      existsSync: true,
      mkdirSync: true,
      writeFileSync: true
    } 
  })
  
  it('should fail if appRoot is null', () => {
    expect(() => setupClient(null, {}, testClientName))
      .toThrow(Error)
  })

  it('should fail if appConfig is null', () => {
    expect(() => setupClient("", null, testClientName))
      .toThrow(Error)
  })

  it('should return a valid base path', () => {
    const { BASE_PATH } = setupClient(testAppRoot, appJson, testClientName)
    const expectedPath = path.join(testAppRoot, 'base')
    expect(BASE_PATH).toBe(expectedPath)
  })

  it('should provide the name of the client from all sources (argument, node env, or appJson)', () => {
    const { CLIENT_NAME } = setupClient(testAppRoot, appJson, testClientName)
    expect(CLIENT_NAME).toBe(testClientName)

    const { CLIENT_NAME: nameFromConfig } = setupClient(testAppRoot, appJson, null)
    expect(nameFromConfig).toBe(appJson.name)

    const envName = "Fight Milk Inc."
    process.env.CLIENT = envName
    const { CLIENT_NAME: nameFromNodeEnv } = setupClient(testAppRoot, appJson, null)
    expect(nameFromNodeEnv).toBe(envName)
    delete process.env["CLIENT"]
  })

  it('should indicate if a client folder exists or not', () => {
    const { HAS_CLIENT } = setupClient(testAppRoot, appJson, null)
    expect(HAS_CLIENT).toBe(false)

    const { HAS_CLIENT: clientDefined } = setupClient(testAppRoot, appJson, testClientName)
    expect(clientDefined).toBe(true)
  })

  it('should provide an app config object that is merged from the app configs of the client and the root app', () => {
    const { APP_CONFIG, APP_CONFIG_PATH } = setupClient(testAppRoot, appJson, testClientName)
    
    // verify the name was overwritten with the client's name
    expect(APP_CONFIG.name).toEqual(testClientName)

    // verify it uses the root appJson paths, since the test client app json didn't define those
    expect(APP_CONFIG.clientResolver.paths).toEqual(appJson.clientResolver.paths)
  })
})
