const { git } = require('KegGitCli')
const { DOCKER } = require('KegConst/docker')
const { getTask } = require('KegMocks/helpers/testTasks')
const { dockerData, docker } = require('KegMocks/libs/docker/docker')

const globalConfig = global.getGlobalCliConfig()

jest.setMock('KegDocCli', docker)

const providerUrl = 'test.provider.url/tests'
const baseLoc = DOCKER.CONTAINERS.BASE.ENV.KEG_CONTEXT_PATH
const coreLoc = DOCKER.CONTAINERS.CORE.ENV.KEG_CONTEXT_PATH
const compLoc = DOCKER.CONTAINERS.COMPONENTS.ENV.KEG_CONTEXT_PATH

const defArgs = {
  globalConfig,
  tasks: global.cliTasks(globalConfig),
  task: {
    ...getTask(),
    options: {
    }
  },
  options: []
}

const args = {
  base: {
    args: {
      ...defArgs,
      command: 'base',
      params: {
        context: 'base',
        tag: 'test-tag',
      }
    },
    image: dockerData.images.base,
    url: providerUrl
  },
  core: {
    args: {
      ...defArgs,
      command: 'core',
      params: {
        context: 'core',
        tag: 'test-tag',
      }
    },
    image: dockerData.images.core,
    url: providerUrl
  },
  components: {
    args: {
      ...defArgs,
      command: 'components',
      params: {
        context: 'components',
        tag: 'test-tag',
      }
    },
    image: dockerData.images.components,
    url: providerUrl
  },
  tap: {
    args: {
      ...defArgs,
      command: 'tap',
      params: {
        context: 'tap',
        tap: 'tap-test',
        tag: 'test-tag',
      }
    },
    image: dockerData.images.tap,
    url: providerUrl
  }
}

const { addProviderTags } = require('../addProviderTags')

describe('addProviderTags', () => {

  beforeEach(() => {
    docker.image.tag.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('should return a url with the passed in params tag and image added', async () => {

    const resp = await addProviderTags(args.base.image, args.base.url, args.base.args)
    expect(resp).toBe('test.provider.url/tests/keg-base:test-tag')

  })

  it('should call the docker.image.tag method', async () => {

    expect(docker.image.tag).not.toHaveBeenCalled()
    const resp = await addProviderTags(args.core.image, args.core.url, args.core.args)
    expect(docker.image.tag).toHaveBeenCalled()

  })

  it('should call the docker.image.tag with the same tag thats returned', async () => {

    const resp = await addProviderTags(args.core.image, args.core.url, args.core.args)
    const addTag = docker.image.tag.mock.calls[0][0].tag
    expect(resp).toBe(addTag)

  })

  it('should use the current branch name when no tag is passed in', async () => {

    const oldLog = console.log
    console.log = () => {}

    const curBranch = await git.branch.current({ location: compLoc || process.cwd()})

    const compArgs = args.components
    const compParams = { ...compArgs.args.params }
    delete compParams.tag
    
    const resp = await addProviderTags(
      compArgs.image,
      compArgs.url,
      { ...compArgs.args, params: compParams }
    )

    expect(resp).toBe(`test.provider.url/tests/keg-components:${curBranch.name}`)

    console.log = oldLog

  })


})