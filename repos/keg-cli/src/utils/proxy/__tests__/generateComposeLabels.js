const globalConfig = global.getGlobalCliConfig()
const { DOCKER } = require('KegConst/docker')
const { generatedLabels } = require('KegMocks/libs/docker/compose')
const { injectedTest } = require('KegMocks/injected/injectedTest')
const { generateComposeLabels } = require('../generateComposeLabels')

const args = {
  core: {
    globalConfig,
    params: {
      context: 'core',
      image: 'keg-core',
    },
    cmd: 'up',
    proxyDomain: 'core',
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
    proxyDomain: 'components',
    cmdContext: 'components',
    contextEnvs: {
      ...DOCKER.CONTAINERS.COMPONENTS.ENV,
    },
  },
  injected: {
    globalConfig,
    proxyDomain: 'injected',
    ...injectedTest
  }
}

describe('generateComposeLabels', () => {

  afterAll(() => jest.resetAllMocks())

  it('It generate the correct labels for keg-core', async () => {
    const labels = generateComposeLabels(args.core)
    expect(labels).toEqual(generatedLabels.core)
  })

  it('It generate the correct labels for keg-components', async () => {
    const labels = generateComposeLabels(args.components)
    expect(labels).toEqual(generatedLabels.components)
  })

  it('It generate the correct labels for injected apps', async () => {
    const labels = generateComposeLabels(args.injected)
    expect(labels).toEqual(generatedLabels.injected)
  })

})
