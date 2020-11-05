require('KegMocks/libs/docker')
const { injectedTest } = require('KegMocks/injected/injectedTest')
const { DOCKER } = require('KegConst/docker')
const globalConfig = global.getGlobalCliConfig()

const args = {
  core: {
    globalConfig,
    params: {
      context: 'core',
    },
    cmdContext: 'core',
    contextData: {
      context: 'core',
      noPrefix: 'keg-core',
      prefix: undefined,
      cmdContext: 'core',
    },
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
    cmdContext: 'components',
    contextData: {
      context: 'components',
      image: 'keg-components',
      ...global.testDocker.images.components,
    },
    contextEnvs: {
      ...DOCKER.CONTAINERS.COMPONENTS.ENV,
    },
  },
  injected: {
    globalConfig,
    ...injectedTest
  }
}

const proxyDomainMocks = {
  'keg-core': `proxy-domain-add-plugin`,
  'keg-components': `proxy-domain-new-component`,
  'tap-test': `proxy-domain-tap-feature`,
  'tap-injected-test': 'injected-proxy-value'
}

const domainFromLabel = jest.fn((itemRef, type) => {
  return `${itemRef}-${type}`
})
jest.setMock('../getProxyDomainFromLabel', { getProxyDomainFromLabel: domainFromLabel })

const domainFromBranch = jest.fn((context, path) => {
  return proxyDomainMocks[context]
})
jest.setMock('../getProxyDomainFromBranch', { getProxyDomainFromBranch: domainFromBranch })

const { getKegProxyDomain } = require('../getKegProxyDomain')

describe('getKegProxyDomain', () => {

  beforeEach(() => {
    domainFromBranch.mockClear()
    domainFromLabel.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('Should get the domain from git when id || rootId is NOT passed', async () => {
    expect(domainFromBranch).not.toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()
    const proxyDomain = await getKegProxyDomain(args.core, args.core.contextEnvs)
    expect(domainFromBranch).toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()
  })

  it('Should get the domain from label when id || rootId is passed', async () => {
    expect(domainFromBranch).not.toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()
    const proxyDomain = await getKegProxyDomain(args.components, args.components.contextEnvs)
    expect(domainFromLabel).toHaveBeenCalled()
    expect(domainFromBranch).not.toHaveBeenCalled()
  })

  it('Should get the domain from label with image and tag and no id', async () => {
    expect(domainFromBranch).not.toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()

    const rootId = args.components.contextEnvs.rootId
    const proxyDomain = await getKegProxyDomain({
      ...args.components,
      params: {
        image: 'keg-components',
        tag: 'develop'
      },
      contextData: {}
    }, args.components.contextEnvs)

    expect(proxyDomain).toBe('keg-components:develop-container')

    expect(domainFromLabel).toHaveBeenCalled()
    expect(domainFromBranch).not.toHaveBeenCalled()
  })

  it('Should set the type as image, when rootId exists', async () => {
    expect(domainFromBranch).not.toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()

    const rootId = args.components.contextEnvs.rootId
    const proxyDomain = await getKegProxyDomain({
      ...args.components,
      params: {
        image: 'keg-components',
        tag: 'develop'
      },
      contextData: { rootId: 'keg-components' }
    }, args.components.contextEnvs)

    expect(proxyDomain).toBe('keg-components:develop-image')

    expect(domainFromLabel).toHaveBeenCalled()
    expect(domainFromBranch).not.toHaveBeenCalled()
  })

  it('Should use the __injected tap value when it exists', async () => {
    expect(domainFromBranch).not.toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()
    const proxyDomain = await getKegProxyDomain(args.injected, args.injected.contextEnvs)

    expect(proxyDomain).toBe(proxyDomainMocks[injectedTest.params.__injected.tap])

    expect(domainFromBranch).toHaveBeenCalled()
    expect(domainFromLabel).not.toHaveBeenCalled()
  })

})
