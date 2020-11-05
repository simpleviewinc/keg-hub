const { docker } = require('KegMocks/libs/docker')
const globalConfig = global.getGlobalCliConfig()

jest.setMock('KegDocCli', docker)

const internalTaskMock = jest.fn(args => {
  return args
})

jest.setMock('KegUtils/task/runInternalTask', { runInternalTask: internalTaskMock })

const { proxyService } = require('../proxyService')

describe('proxyService', () => {

  beforeEach(() => {
    docker.container.exists.mockClear()
    internalTaskMock.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('It checks if the keg-proxy container exists', async () => {
    await proxyService({ globalConfig, params: {} })
    expect(docker.container.exists).toHaveBeenCalled()
    expect(docker.container.exists.mock.calls[0][0]).toBe('keg-proxy')
  })

  it(`calls task to start the proxy if it does not exist`, async () => {
    await proxyService({ globalConfig, params: {} })
    expect(internalTaskMock).toHaveBeenCalled()
    expect(internalTaskMock.mock.calls[0][0]).toBe('proxy.tasks.start')
  })

  it(`does not call the proxy start task when the container already exists`, async () => {
    global.testDocker.containers[`keg-proxy`] = true
    await proxyService({ globalConfig, params: {} })
    expect(internalTaskMock).not.toHaveBeenCalled()
    delete global.testDocker.containers[`keg-proxy`]
  })

})
