const globalConfig = global.getGlobalCliConfig()
const { dockerLabels } = require('KegMocks/libs/docker/docker')
const { DOCKER } = require('KegConst/docker')
const { injectedTest, injectedContainer } = require('KegMocks/injected/injectedTest')



const withInjected = {
  ...DOCKER.CONTAINERS,
  INJECTED: injectedContainer
}

jest.setMock('KegConst/docker', { DOCKER: { ...DOCKER, CONTAINERS: withInjected }})

const args = {
  base: {
    globalConfig,
    params: {
      context: 'base',
      image: 'keg-base',
    },
    cmd: 'up',
    proxyDomain: 'base',
    cmdContext: 'base',
    contextEnvs: {
      ...DOCKER.CONTAINERS.BASE.ENV,
    },
  },
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
  proxy: {
    globalConfig,
    params: {
      context: 'proxy',
      image: 'keg-proxy',
    },
    cmd: 'up',
    proxyDomain: 'proxy',
    cmdContext: 'proxy',
    contextEnvs: {
      ...DOCKER.CONTAINERS.PROXY.ENV,
    },
  },
  injected: {
    globalConfig,
    proxyDomain: 'injected',
    ...injectedTest
  }
}

const { getBuildLabels } = require('../getBuildLabels')

describe('getBuildLabels', () => {

  it('Should return the default labels when no labels are passed in for keg-base', () => {
    const labels = getBuildLabels(args.base)
    expect(labels).toBe(dockerLabels.base)
  })

  it('Should return the default labels when no labels are passed in for keg-core', () => {
    const labels = getBuildLabels(args.core)
    expect(labels).toBe(dockerLabels.core)
  })

  it('Should return the default labels when no labels are passed in for keg-components', () => {
    const labels = getBuildLabels(args.components)
    expect(labels).toBe(dockerLabels.components)
  })

  it('Should return the default labels when no labels are passed in for keg-proxy', () => {
    const labels = getBuildLabels(args.proxy)
    expect(labels).toBe(dockerLabels.proxy)
  })

  it('Should return the default labels when no labels are passed in for tap', () => {
    const labels = getBuildLabels(
      { ...args.injected, params: { ...args.injected.params, context: 'tap' } },
    )
    expect(labels).toBe(dockerLabels.injected)
  })

  it('Should add extra labels when they are passed in as a string', () => {
    const addedLabels = `com.test.label="my-test-label",com.test.other="my-other-test-label"`
    const labels = getBuildLabels(
      { ...args.base, params: { ...args.base.params, labels: addedLabels } },
    )

    expect(labels.indexOf(`--label com.test.label="my-test-label"`)).not.toBe(-1)
    expect(labels.indexOf(`--label com.test.other="my-other-test-label"`)).not.toBe(-1)
  })

  it('Should add extra labels when they are passed in as an array', () => {
    const addedLabels = [
      `com.test.label="my-test-label"`,
      `com.test.other="my-other-test-label"`
    ]
    const labels = getBuildLabels(
      { ...args.base, params: { ...args.base.params, labels: addedLabels } },
    )

    expect(labels.indexOf(`--label com.test.label="my-test-label"`)).not.toBe(-1)
    expect(labels.indexOf(`--label com.test.other="my-other-test-label"`)).not.toBe(-1)
  })

})