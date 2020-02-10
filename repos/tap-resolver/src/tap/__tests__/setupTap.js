const path = require('path')
const { get } = require('jsutils')
const { FS, Rimraf, config, options, kegPath } = require('../../mocks')

// Helpers to allow calling the setup function in a test env
const testTapName = "test"
const testAppRoot = kegPath // tap-resolver root

// Mock the called functions for testing
// Overwrite the lstat so we can get access to the path it's checking for
let validPathMatch = false
const isDirMock = (checkPath) => {
  return jest.fn(() => {
    return validPathMatch && validPathMatch === checkPath
  })
}
FS.lstatSync = jest.fn(checkPath => { return { isDirectory: isDirMock(checkPath) } })
FS.statSync = jest.fn(checkPath =>  {
  if(checkPath.indexOf('test/src/mocks/base') !== -1){
    throw new Error('Invalid Path!')
  }
  return isDirMock(checkPath)()
})

jest.setMock('rimraf', Rimraf)
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

  describe('params (options)', () => {

    it('should fail if options.config is null', () => {
      expect(() => setupTap({ ...options, config: null })).toThrow(Error)
    })

    it('should fail if options.kegPath is null', () => {
      expect(() => setupTap({ ...options, kegPath: null })).toThrow(Error)
    })

  })

  describe('Finding the correct base path', () => {

    it('should use the BASE_PATH set in the config if it is a directory', () => {
      validPathMatch = path.join(testAppRoot, get(config, [ 'keg', 'tapResolver', 'paths', 'kegSrc' ]))

      const { BASE_PATH } = setupTap(options)

      expect(BASE_PATH).toBe(validPathMatch)
    })

  })

  describe('Finding the tap name', () => {

    it('should use the name from the config when no param is passed in or ENV is set', () => {
      const { TAP_NAME } = setupTap(options)

      expect(TAP_NAME).toBe(config.name)
    })

    it('should use the passed in tapName when passed in as a param', () => {
      const { TAP_NAME } = setupTap(options)

      expect(TAP_NAME).toBe(testTapName)
    })

    it('should use process.env["TAP"] variable as the tap name when it exists', () => {
      const envName = "Fight Milk Inc."
      process.env.TAP = envName
      const { TAP_NAME: nameFromNodeEnv } = setupTap(options)

      expect(nameFromNodeEnv).toBe(envName)
      delete process.env["TAP"]
    })

    it('should use the ENV over config.name when both exist', () => {
      const envName = "Fight Milk Inc."
      process.env.TAP = envName
      const { TAP_NAME } = setupTap(options)

      expect(TAP_NAME).toBe(envName)
      delete process.env["TAP"]
    })

  })

  describe('Configuring the tap', () => {

    it('should indicate if a tap folder exists or not', () => {
      const { HAS_TAP } = setupTap({ ...options, config: { ...config, name: config.keg.name  } })
      expect(HAS_TAP).toBe(false)

      const { HAS_TAP: tapDefined } = setupTap(options)
      expect(tapDefined).toBe(true)
    })

    it('should provide a merged config from the tap and the root path', () => {
      const { APP_CONFIG, APP_CONFIG_PATH } = setupTap(options)
      
      // verify the name was overwritten with the tap's name
      expect(APP_CONFIG.name).toEqual(config.name)

      // verify it uses the root config paths, since the test tap app json didn't define those
      expect(APP_CONFIG.keg.tapResolver.paths).toEqual(config.keg.tapResolver.paths)
    })

  })

})
