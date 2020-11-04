const globalConfig = global.getGlobalCliConfig()
const { injectedTest } = require('KegMocks/injected/injectedTest')
const { DOCKER } = require('KegConst/docker')
const { isStr } = require('@keg-hub/jsutils')
const kegFileSys = require('KegFileSys/fileSys')
const { removeInjectedCompose } = require('../removeInjectedCompose')

const writeFileError = false
const writeFileMock = jest.fn(data => {
  return writeFileError
    ? [ new Error(`Injected file error`), false ]
    : [ false, true ]
})

jest.setMock('KegFileSys/fileSys', { ...kegFileSys, writeFile: writeFileMock })

const getKegProxyDomainMock = jest.fn((data, contextEnvs) => {
  return contextEnvs.IMAGE 
})

jest.setMock('../../../proxy/getKegProxyDomain', {  getKegProxyDomain: getKegProxyDomainMock })



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


const { buildComposeCmd } = require('../buildComposeCmd')

describe('buildComposeCmd', () => {

  afterAll(() => jest.resetAllMocks())

  describe('cmd === up', () => {

    beforeEach(async () => {
      await removeInjectedCompose(`keg-core`)
      await removeInjectedCompose(`keg-components`)
      getKegProxyDomainMock.mockClear()
    })

    it('Should build the correct docker-compose up command for keg-core', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd(args.core)
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')

      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/keg-core.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`core/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('up')).not.toBe(-1)
      expect(cmdArgs.indexOf('--detach')).not.toBe(-1)
      expect(getKegProxyDomainMock).toHaveBeenCalled()

    })

    it('Should build the correct docker-compose up command for keg-components', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd(args.components)
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')
    
      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/keg-components.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`components/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('up')).not.toBe(-1)
      expect(cmdArgs.indexOf('--detach')).not.toBe(-1)
      expect(getKegProxyDomainMock).toHaveBeenCalled()

    })

    it('Should build the correct docker-compose up command for injected taps', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd(args.injected)
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')

      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/tap-injected-test.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`tap-injected-test/container/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('up')).not.toBe(-1)
      expect(cmdArgs.indexOf('--detach')).not.toBe(-1)
      expect(getKegProxyDomainMock).toHaveBeenCalled()

    })

    it('Should add the detached argument, when attach param is false', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, params: { ...args.core.params,  attach: false }})
      expect(isStr(dockerCmd)).toBe(true)
      expect(dockerCmd.indexOf('--detach')).not.toBe(-1)
    })

    it('Should not add the detached argument, when attach param is true', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, params: { ...args.core.params,  attach: true }})
      expect(isStr(dockerCmd)).toBe(true)
      expect(dockerCmd.indexOf('--detach')).toBe(-1)
    })

  })

  describe('cmd === down', () => {

    beforeEach(async () => {
      await removeInjectedCompose(`keg-core`)
      await removeInjectedCompose(`keg-components`)
    })

    it('Should build the correct docker-compose down command for keg-core', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down' })
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')

      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/keg-core.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`core/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('down')).not.toBe(-1)

    })

    it('Should build the correct docker-compose down command for keg-components', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.components, cmd: 'down' })
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')
    
      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/keg-components.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`components/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('down')).not.toBe(-1)

    })

    it('Should build the correct docker-compose down command for injected taps', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.injected, cmd: 'down' })
      expect(isStr(dockerCmd)).toBe(true)
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, ...cmdArgs ] = dockerCmd.split(' ')

      expect(compose).toBe('docker-compose')
      expect(injectedFileKey).toBe('-f')
      expect(injectedFilePath.indexOf(`.tmp/tap-injected-test.yml`) !== -1).toBe(true)
      expect(defaultFileKey).toBe('-f')
      expect(defaultFilePath.indexOf(`tap-injected-test/container/docker-compose.yml`) !== -1).toBe(true)
      expect(cmdArgs.indexOf('down')).not.toBe(-1)

    })

    it('Should include -rmi all args when remove param is all', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'all' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('-rmi')
      expect(cmdArgs[1]).toBe('all')
    })

    it('Should include -rmi local args when remove param is local', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'local' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('-rmi')
      expect(cmdArgs[1]).toBe('local')
    })

    it('Should include --volumes arg when remove param is volumes', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'volumes' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('--volumes')
    })

    it('Should include --volumes arg when remove param is v', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'v' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('--volumes')
    })

    it('Should include --orphans arg when remove param is orphans', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'orphans' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('--remove-orphans')
    })

    it('Should include --orphans arg when remove param is or', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'or' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')
      expect(cmdArgs[0]).toBe('--remove-orphans')
    })

    it('Should include multiple remove args when remove param is a lit seperated by comma', async () => {
      const { dockerCmd, composeData } = await buildComposeCmd({ ...args.core, cmd: 'down', params: { ...args.core.params, remove: 'or,v,local' }})
      const [ compose, injectedFileKey, injectedFilePath, defaultFileKey, defaultFilePath, cmd, ...cmdArgs ] = dockerCmd.split(' ')

      ;([ '--remove-orphans', '--volumes', '-rmi', 'local' ]).map(arg => expect(cmdArgs.indexOf(arg)).not.toBe(-1))
    })

  })

})