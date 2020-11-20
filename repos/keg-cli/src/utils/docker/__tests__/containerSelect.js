const { docker } = require('KegMocks/libs/docker')
const { AskIt } = require('KegMocks/ask')

jest.setMock('@keg-hub/ask-it', { ask: AskIt })
jest.setMock('KegDocCli', docker)
jest.setMock('KegConst/envs', { KEG_ENVS: { KEG_PROXY_HOST: 'local.kegdev.xyz' }})

const containers = Object.values(global.testDocker.containers)

const { containerSelect } = require('../containerSelect')

describe('containerSelect', () => {

  beforeEach(() => {
    AskIt.promptList.mockClear()
    docker.container.list.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('should call docker.container.list to get a list of all containers', async () => {
    expect(docker.container.list).not.toHaveBeenCalled()
    await containerSelect()
    expect(docker.container.list).toHaveBeenCalled()
  })

  it('should call a filter function on all containers if its passed in', async () => {
    const filter = jest.fn(cont => cont)
    await containerSelect(filter)
    expect(filter).toHaveBeenCalled()
  })

  it('should call ask.promptList', async () => {
    expect(AskIt.promptList).not.toHaveBeenCalled()
    await containerSelect()
    expect(AskIt.promptList).toHaveBeenCalled()
  })

  it('should return the selected container', async () => {
    // Tests default to selecting the 1 position of the passed in list
    const resp = await containerSelect()
    expect(resp).toBe(containers[1])
  })

})