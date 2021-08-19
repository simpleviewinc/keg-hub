const {
  options,
  tapConfigPath,
  basePath,
  kegPath,
  tapAssetsPath,
} = require('../../mocks')
const { get } = require('@keg-hub/jsutils')

// Helpers to allow calling the setup function in a test env
const buildAliases = jest.fn(() => {
  return jest.fn()
})
const buildAssets = jest.fn(() => {
  return {
    ASSETS_PATH: `${options.tapPath}/assets`,
    FONTS_PATH: `${options.tapPath}/assets/fonts`,
  }
})
const validateApp = jest.fn(() => {
  return true
})
const setupTap = jest.fn(() => {
  return {
    APP_CONFIG: options.config,
    APP_CONFIG_PATH: tapConfigPath,
    BASE_PATH: basePath,
    TAP_NAME: options.config.name,
    TAP_PATH: options.tapPath,
    TAP_SRC: options.tapPath,
    HAS_TAP: true,
  }
})
const defResolver = () => ''
const aliases = {
  MyTestTapAppRoot: kegPath,
  MyTestTapAssets: 'src/mocks/taps/test/assets',
  MyTestTapFonts: 'src/mocks/taps/test/assets/fonts',
  MyTestTapBase: 'src/mocks/base',
  MyTestTapTap: 'src/mocks/taps/test',
  MyTestTapTapSrc: 'src/mocks/taps/test',
  MyTestTapConfig: 'src/mocks/taps/test/app.json',
}

// Mock the called functions for testing
jest.setMock('../buildAliases', buildAliases)
jest.setMock('../buildAssets', buildAssets)
jest.setMock('../../tap/setupTap', setupTap)
jest.setMock('../../helpers', { validateApp })
jest.setMock('../../resolvers/contentResolver', defResolver)

const buildConstants = require('../buildConstants')

describe('Build Constants', () => {
  beforeEach(() => {
    validateApp.mockClear()
    buildAssets.mockClear()
    buildAliases.mockClear()
  })

  it('should call the validateApp method', () => {
    buildConstants(options)

    expect(validateApp).toHaveBeenCalledWith(options.kegPath, options.config)
  })

  it('should call the setupTap method', () => {
    buildConstants(options)

    expect(setupTap).toHaveBeenCalledWith(options)
  })

  it('should call the buildAssets method', () => {
    buildConstants(options)

    expect(buildAssets).toHaveBeenCalled()
  })

  it('should return an object with namespaced aliases', () => {
    const nameSpace = get(options, 'config.keg.tapResolver.aliases.nameSpace')
    const { ALIASES } = buildConstants(options)
    const builtKeys = Object.keys(ALIASES)

    Object.keys(aliases).map(key => {
      expect(key.indexOf(nameSpace)).not.toBe(-1)
      expect(builtKeys.indexOf(key)).not.toBe(-1)
      expect(ALIASES[key].indexOf(aliases[key])).not.toBe(-1)
    })
  })

  it('should return an object with the correct paths', () => {
    const {
      APP_CONFIG_PATH,
      ASSETS_PATH,
      BASE_PATH,
      TAP_PATH,
    } = buildConstants(options)

    expect(tapConfigPath).toBe(APP_CONFIG_PATH)
    expect(tapAssetsPath).toBe(ASSETS_PATH)
    expect(basePath).toBe(BASE_PATH)
    expect(options.tapPath).toBe(TAP_PATH)
  })

  it('should return an object with the correct base and dynamic aliases', () => {
    const nameSpace = get(options, 'config.keg.tapResolver.aliases.nameSpace')
    const baseNameSpace = get(options, 'config.keg.tapResolver.aliases.baseNameSpace')

    const baseAliases = get(options, 'config.keg.tapResolver.aliases.base')
    const dynamicAliases = get(
      options,
      'config.keg.tapResolver.aliases.dynamic'
    )
    const { BASE_CONTENT, DYNAMIC_CONTENT } = buildConstants(options)
    const baseKeys = Object.keys(BASE_CONTENT)
    const dynamicKeys = Object.keys(DYNAMIC_CONTENT)

    baseKeys.map(key => {
      let orgKey
      let hasNameSpace
      
      if(key.indexOf(nameSpace) === 0){
        hasNameSpace = true
        orgKey = key.substring(nameSpace.length)
      }
      else if(key.indexOf(baseNameSpace) === 0){
        hasNameSpace = true
        orgKey = key.substring(baseNameSpace.length)
      }

      expect(hasNameSpace).toBe(true)
      expect(baseAliases[orgKey]).not.toBe(undefined)
      expect(BASE_CONTENT[key]).toBe(baseAliases[orgKey])
    })

    dynamicKeys.map(key => {
      let orgKey
      let hasNameSpace
      
      if(key.indexOf(nameSpace) === 0){
        hasNameSpace = true
        orgKey = key.substring(nameSpace.length)
      }
      else if(key.indexOf(baseNameSpace) === 0){
        hasNameSpace = true
        orgKey = key.substring(baseNameSpace.length)
      }

      expect(hasNameSpace).toBe(true)
      expect(dynamicAliases[orgKey]).not.toBe(undefined)
      expect(DYNAMIC_CONTENT[key]).toBe(dynamicAliases[orgKey])
    })
  })

  it('should return an object with the correct extensions', () => {
    const exts = get(options, 'config.keg.tapResolver.extensions.resolve')
    const { EXTENSIONS } = buildConstants(options)

    EXTENSIONS.map(key => expect(exts.indexOf(key)).not.toBe(-1))
  })
})
