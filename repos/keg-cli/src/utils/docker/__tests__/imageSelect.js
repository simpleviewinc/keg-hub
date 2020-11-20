const { docker } = require('KegMocks/libs/docker')
const { AskIt } = require('KegMocks/ask')

jest.setMock('@keg-hub/ask-it', { ask: AskIt })
jest.setMock('KegDocCli', docker)
jest.setMock('KegConst/envs', { KEG_ENVS: { KEG_PROXY_HOST: 'local.kegdev.xyz' }})

const images = Object.values(global.testDocker.images)

const { imageSelect } = require('../imageSelect')

describe('imageSelect', () => {

  beforeEach(() => {
    AskIt.promptList.mockClear()
    docker.image.list.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('should call docker.image.list to get a list of all images', async () => {
    expect(docker.image.list).not.toHaveBeenCalled()
    await imageSelect()
    expect(docker.image.list).toHaveBeenCalled()
  })

  it('should call ask.promptList', async () => {
    expect(AskIt.promptList).not.toHaveBeenCalled()
    await imageSelect()
    expect(AskIt.promptList).toHaveBeenCalled()
  })

  it('should return the selected image', async () => {
    // Tests default to selecting the 1 position of the passed in list
    const resp = await imageSelect()
    expect(resp).toBe(images[1])
  })

})