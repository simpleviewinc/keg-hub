const path = require('path')
const { get } = require('jsutils')
const { FS } = require('../../mocks')
const appConfig = Object.freeze(require('./app.json'))

// Helpers to allow calling the setup function in a test env
const testTapName = "test"
const testAppRoot = "../" // tap-resolver root
const tapConfig = require(`../../taps/${testTapName}/app.json`)

// Mock the called functions for testing
// Overwrite the lstat so we can get access to the path it's checking for
let validPathMatch = false
const isDirMock = (checkPath) => {
  return jest.fn(() => { return validPathMatch && validPathMatch === checkPath })
}
FS.lstatSync = jest.fn(checkPath => { return { isDirectory: isDirMock(checkPath) } })

// mocks out use in setupTapConfig~cleanupOldTempConfig
jest.mock('rimraf', () => ({ sync: () => true  }))
jest.setMock('fs', FS)

// Module to test
const setupTap = require('../setupTap')

describe('Setup Tap', () => {

  beforeEach(() => {
    global.testMocks.fs = { 
      stat: true,
      exists: true,
      existsSync: true,
      mkdirSync: true,
      writeFileSync: true,
    } 
  })

  describe('params (appRoot, appConfig)', () => {

    it('should fail if appRoot is null', () => {
      expect(() => setupTap(null, {}, testTapName)).toThrow(Error)
    })

    it('should fail if appConfig is null', () => {
      expect(() => setupTap("_", null, testTapName)).toThrow(Error)
    })

  })

  describe('Finding the correct base path', () => {

    it('should use the BASE_PATH set in the appConfig if it is a directory', () => {
      validPathMatch = path.join(testAppRoot, get(appConfig, [ 'tapResolver', 'paths', 'baseTap' ]))
      const { BASE_PATH } = setupTap(testAppRoot, appConfig, testTapName)

      expect(BASE_PATH).toBe(validPathMatch)
    })

    it('should build BASE_PATH from /taps and appConfig.name if baseTap is not in appConfig', () => {
      validPathMatch = path.join(testAppRoot, './taps', appConfig.name)
      const { BASE_PATH } = setupTap(testAppRoot, appConfig, testTapName)

      expect(BASE_PATH).toBe(validPathMatch)
    })

    it('should build BASE_PATH from and appConfig.name if no baseTap or taps folders', () => {
      validPathMatch = path.join(testAppRoot, appConfig.name)
      const { BASE_PATH } = setupTap(testAppRoot, appConfig, testTapName)

      expect(BASE_PATH).toBe(validPathMatch)
    })

    it('should use the appRoot as the BASE_PATH, if no other base can be found', () => {
      validPathMatch = testAppRoot
      const { BASE_PATH } = setupTap(testAppRoot, appConfig, testTapName)

      expect(BASE_PATH).toBe(validPathMatch)
    })

  })

  describe('Finding the tap name', () => {

    it('should use the name from the appConfig when no param is passed in or ENV is set', () => {
      const { TAP_NAME } = setupTap(testAppRoot, appConfig, null)

      expect(TAP_NAME).toBe(appConfig.name)
    })

    it('should use the passed in tapName when passed in as a param', () => {
      const { TAP_NAME } = setupTap(testAppRoot, appConfig, testTapName)

      expect(TAP_NAME).toBe(testTapName)
    })

    it('should use process.env["TAP"] variable as the tap name when it exists', () => {
      const envName = "Fight Milk Inc."
      process.env.TAP = envName
      const { TAP_NAME: nameFromNodeEnv } = setupTap(testAppRoot, appConfig, null)

      expect(nameFromNodeEnv).toBe(envName)
      delete process.env["TAP"]
    })

    it('should use the passed in tapName when the ENV and appConfig.name also exist', () => {
      const envName = "Fight Milk Inc."
      process.env.TAP = envName
      const { TAP_NAME } = setupTap(testAppRoot, appConfig, testTapName)

      expect(TAP_NAME).toBe(testTapName)
      delete process.env["TAP"]
    })

    it('should use the ENV over appConfig.name when both exist and no param is passed in', () => {
      const envName = "Fight Milk Inc."
      process.env.TAP = envName
      const { TAP_NAME } = setupTap(testAppRoot, appConfig, null)

      expect(TAP_NAME).toBe(envName)
      delete process.env["TAP"]
    })

  })

  describe('Configuring the tap', () => {

    it('should indicate if a tap folder exists or not', () => {
      const { HAS_TAP } = setupTap(testAppRoot, appConfig, null)
      expect(HAS_TAP).toBe(false)

      const { HAS_TAP: tapDefined } = setupTap(testAppRoot, appConfig, testTapName)
      expect(tapDefined).toBe(true)
    })

    it('should provide a merged appConfig from the tap and the root path', () => {
      const { APP_CONFIG, APP_CONFIG_PATH } = setupTap(testAppRoot, appConfig, testTapName)
      
      // verify the name was overwritten with the tap's name
      expect(APP_CONFIG.name).toEqual(testTapName)

      // verify it uses the root appConfig paths, since the test tap app json didn't define those
      expect(APP_CONFIG.tapResolver.paths).toEqual(appConfig.tapResolver.paths)
    })

  })

})
