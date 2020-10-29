const { addProxyOptions } = require('../addProxyOptions')
const { DOCKER } = require('KegConst/docker')
const { dockerPackage, dockerProxyOpts } = require('KegMocks/libs/docker')

const buildArgs = () => {
  return {
    core: [
      [ '--option-core' ],
      { contextEnvs: DOCKER.CONTAINERS.CORE.ENV },
      dockerPackage.core,
    ],
    components: [
      [],
      { contextEnvs: DOCKER.CONTAINERS.COMPONENTS.ENV },
      dockerPackage.components,
    ],
    tap: [
      [ '--option-tap' ],
      { contextEnvs: DOCKER.CONTAINERS.TAP.ENV },
      dockerPackage.tap,
    ]
  }
  
}

describe('addProxyOptions', () => {

  afterAll(() => jest.resetAllMocks())

  it('Should add all options to the passed in options array for keg-core', async () => {
    const args = buildArgs().core
    expect(args[0]).toBe(addProxyOptions(...args))
  })

  it('Should add the correct options for keg-core', async () => {
    const resp = addProxyOptions(...buildArgs().core)
    dockerProxyOpts.core.map(option => expect(resp.indexOf(option)).not.toBe(-1))
  })

  it('Should add the correct options for keg-components', async () => {
    const resp = addProxyOptions(...buildArgs().components)
    dockerProxyOpts.components.map(option => expect(resp.indexOf(option)).not.toBe(-1))
  })

  it('Should add the correct options for tap', async () => {
    const resp = addProxyOptions(...buildArgs().tap)
    dockerProxyOpts.tap.map(option => expect(resp.indexOf(option)).not.toBe(-1))
  })

  it('Should only use the tag for the proxy host label when no image exists', async () => {
    const optArgs = [ ...buildArgs().core ]
    optArgs.push({ ...optArgs.pop(), tag: 'only-tag', image: false })
    const resp = addProxyOptions(...optArgs)
    const hostLabel = resp[2]
    expect(hostLabel).toBe('--label traefik.http.routers.only-tag.rule=Host(`only-tag.local.kegdev.xyz`)')
  })

  it('Should only use the image for the proxy host label when no tag exists', async () => {
    const optArgs = [ ...buildArgs().core ]
    optArgs.push({ ...optArgs.pop(), tag: false, image: `only-image` })
    const resp = addProxyOptions(...optArgs)
    const hostLabel = resp[2]
    expect(hostLabel).toBe('--label traefik.http.routers.only-image.rule=Host(`only-image.local.kegdev.xyz`)')
  })

  it('Should use a custom proxy host from the contextEnvs', async () => {
    const optArgs = [ ...buildArgs().core ]
    const parsed = optArgs.pop()
    const containerContext = optArgs.pop()
    containerContext.contextEnvs = {
      ...containerContext.contextEnvs,
      KEG_PROXY_HOST: `custom.proxy.host.com`
    }
    const resp = addProxyOptions(optArgs.pop(), containerContext, parsed)
    const hostLabel = resp[2]
    expect(hostLabel).toBe('--label traefik.http.routers.test-core.rule=Host(`custom.proxy.host.com`)')
  })

  it('Should override the default network with the passed in option', async () => {
    const resp = addProxyOptions(...buildArgs().tap, 'test-custom-network')
    const network = resp.pop()
    expect(network).toBe('--network test-custom-network')
  })

})
