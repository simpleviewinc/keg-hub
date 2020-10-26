const globalConfig = global.getGlobalCliConfig()
const { generatedLabels } = require('KegMocks/libs/docker/compose')
const { injectedTest } = require('KegMocks/injected/injectedTest')
const { generateLabels } = require('../generateLabels')
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
  },
  injected: {
    globalConfig,
    ...injectedTest
  }
}

describe('generateLabels', () => {

  afterAll(() => jest.resetAllMocks())

  it('It generate the correct labels for keg-core', async () => {
    const labels = generateLabels('', args.core)
    expect(labels).toEqual(generatedLabels.core)
  })

  it('It generate the correct labels for keg-components', async () => {
    const labels = generateLabels('', args.components)
    expect(labels).toEqual(generatedLabels.components)
  })

  it('It generate the correct labels for injected apps', async () => {
    const labels = generateLabels('', args.injected)
    expect(labels).toEqual(generatedLabels.injected)
  })

})
