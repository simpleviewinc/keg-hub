const globalConfig = global.getGlobalCliConfig()
const { buildComposeCmd } = require('../buildComposeCmd')
const { DOCKER } = require('KegConst/docker')

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
  }
}

describe('buildComposeCmd', () => {

  afterAll(() => jest.resetAllMocks())

  it('It generates a docker-compose file with defaults', async () => {
    
  })


})