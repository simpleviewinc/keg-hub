const globalConfig = global.getGlobalCliConfig()
const { getContainerConst } = require('../getContainerConst')
const { DOCKER } = require('KegConst/docker')

describe('getContainerConst', () => {

  afterAll(() => jest.resetAllMocks())

  it('It should get the container constant from the DOCKER.CONTAINERS constants', () => {
    expect(getContainerConst('base', 'env').KEG_DOCKER_NAME).toBe('docker-keg')
  })

  it('It should work with deeply nested values', () => {
    expect(getContainerConst('tap', 'values.connect')).toBe('-it')
  })

  it('It should work with uppercase or lowercase values fro args and env paths', () => {

    expect(getContainerConst('tap', 'args.GIT_KEY')).toBe('GIT_KEY')
    expect(getContainerConst('TAP', 'ARGS.git_key')).toBe('GIT_KEY')
    expect(getContainerConst('TAP', 'ARGS.GIT_KEY')).toBe('GIT_KEY')
    expect(getContainerConst('TAP', 'args.git_key')).toBe('GIT_KEY')

    expect(getContainerConst('base', 'env.KEG_DOCKER_NAME')).toBe('docker-keg')
    expect(getContainerConst('base', 'ENV.KEG_DOCKER_NAME')).toBe('docker-keg')
    expect(getContainerConst('BASE', 'env.keg_docker_name')).toBe('docker-keg')
    expect(getContainerConst('BASE', 'env.KEG_DOCKER_NAME')).toBe('docker-keg')

  })

  it('It should work with uppercase or lowercase values for the fist key of non args and envs', () => {

    expect(getContainerConst('TAP', 'VALUES.connect')).toBe('-it')
    expect(getContainerConst('tap', 'VALUES.connect')).toBe('-it')
    expect(getContainerConst('TAP', 'values.connect')).toBe('-it')

  })

  it('It should be an alternate when constant cant be found', () => {

    expect(getContainerConst('tap', 'foo.bar', 'alternate')).toBe('alternate')
    expect(getContainerConst('scooper', 'values.connect', 'alternate')).toBe('alternate')

  })

  it('It should be undefined when constant cant be found and not alternate', () => {
    expect(getContainerConst('tap', 'foo.bar')).toBe(undefined)
  })

  it('It should only work with container is the DOCKER.CONTAINERS constant', () => {

    const containers = Object.keys(DOCKER.CONTAINERS)

    expect(containers.includes('TAP')).toBe(true)
    expect(getContainerConst('TAP', 'values.connect')).toBe('-it')

    expect(containers.includes('BAZ')).toBe(false)
    expect(getContainerConst('BAZ', 'values.connect')).toBe(undefined)

  })

})
