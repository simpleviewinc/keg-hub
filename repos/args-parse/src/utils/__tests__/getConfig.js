const path = require('path')

const joinMock = jest.fn((...toJoin) => path.join(...toJoin)) 
jest.setMock('path', { ...path, join: joinMock })

const { getConfig, clearConfig } = require('../getConfig')

describe('getConfig', () => {

  afterAll(() => jest.resetAllMocks())

  beforeEach(() => {
    clearConfig()
    jest.resetModules()
  })

  it('should load the config', () => {

    const config = getConfig()

    expect(typeof config).toBe('object')
    expect(typeof config.bools).toBe('object')
    expect(typeof config.environment).toBe('object')
    expect(config.test).toBe(undefined)

  })

  it('should cache the loaded config', () => {

    const config = getConfig()
    
    expect(joinMock).toHaveBeenCalled()
    expect(typeof config).toBe('object')
    
    joinMock.mockClear()

    const config2 = getConfig()

    expect(joinMock).not.toHaveBeenCalled()
    expect(typeof config2).toBe('object')
    expect(config2).toBe(config)

  })

  it('should load and merge the config from an ENV when set', () => {

    process.env.PARSE_CONFIG_PATH = 'src/__mocks__/testConfig'
    const config = getConfig()

    expect(typeof config).toBe('object')
    expect(typeof config.test).toBe('object')
    expect(typeof config.environment).toBe('object')

    process.env.PARSE_CONFIG_PATH = undefined
    delete process.env.PARSE_CONFIG_PATH

  })

  it('should load the config from passed in argument', () => {

    expect(process.env.PARSE_CONFIG_PATH).toBe(undefined)
    const config = getConfig({ test: { option: 'foo-bar' } })

    expect(typeof config).toBe('object')
    expect(typeof config.test).toBe('object')
    expect(typeof config.environment).toBe('object')
    expect(config.test.option).toBe('foo-bar')

  })

})
