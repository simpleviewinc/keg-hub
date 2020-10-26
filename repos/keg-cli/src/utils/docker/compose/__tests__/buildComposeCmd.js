const globalConfig = global.getGlobalCliConfig()
const { buildComposeCmd } = require('../buildComposeCmd')
const { injectedTest } = require('KegMocks/injected/injectedTest')
const { DOCKER } = require('KegConst/docker')
const { isStr } = require('@keg-hub/jsutils')

const args = {
  core: {
    globalConfig,
    params: {
      context: 'core',
      image: 'keg-core',
    },
    cmd: 'up',
    cmdContext: 'core',
    contextEnvs: {
      ...DOCKER.CONTAINERS.CORE.ENV,
    },
  },
  components: {
    globalConfig,
    params: {
      context: 'components',
      image: 'keg-components',
    },
    cmd: 'up',
    cmdContext: 'components',
    contextEnvs: {
      ...DOCKER.CONTAINERS.COMPONENTS.ENV,
    },
  },
  injected: {
    globalConfig,
    ...injectedTest
  }
}

describe('buildComposeCmd', () => {

  afterAll(() => jest.resetAllMocks())

  it('It should build the correct docker-compose command for keg-code', async () => {
    const resp = await buildComposeCmd(args.core)
    expect(isStr(resp)).toBe(true)
    const [ compose, fileKey, filePath, ...cmdArgs ] = resp.split(' ')
    expect(compose).toBe('docker-compose')
    expect(fileKey).toBe('-f')
    expect(filePath.indexOf(`core/docker-compose.yml`) !== -1).toBe(true)
    expect(cmdArgs.indexOf('up')).not.toBe(-1)
    expect(cmdArgs.indexOf('--detach')).not.toBe(-1)

  })


})