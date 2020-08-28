const globalConfig = global.getGlobalCliConfig()
const { docker } = require('KegMocks/libs/docker')
const throwNoDockerImg = jest.fn()

jest.setMock('KegDocCli', docker)
jest.setMock('../../error/throwNoDockerImg', { throwNoDockerImg })


const { getContainerCmd } = require('../getContainerCmd')

const checkClearDockerCmd = () => {
  expect(docker.image.getCmd).toHaveBeenCalled()
  docker.image.getCmd.mockClear()
  expect(docker.image.getCmd).not.toHaveBeenCalled()
}

describe('getContainerCmd', () => {

  afterAll(() => jest.resetAllMocks())

  it('It should get the docker image cmd from the context', async () => {

    const baseCmd = await getContainerCmd({ context: 'base' })
    expect(baseCmd).toBe('node')
    checkClearDockerCmd()


    const tapCmd = await getContainerCmd({ context: 'tap' })
    expect(tapCmd).toBe('/bin/sh -c /bin/bash $DOC_CLI_PATH/containers/tap/run.sh "sleep"')
    checkClearDockerCmd()

  })

  it('It should get the docker image cmd from the image name', async () => {

    const baseCmd = await getContainerCmd({ image: 'keg-base' })
    expect(baseCmd).toBe('node')
    checkClearDockerCmd()

    const tapCmd = await getContainerCmd({ image: 'tap' })
    expect(tapCmd).toBe('/bin/sh -c /bin/bash $DOC_CLI_PATH/containers/tap/run.sh "sleep"')
    checkClearDockerCmd()

  })

  it('It should call throwNoDockerImg if no valid image or context is passed', async () => {

    await getContainerCmd({})
    expect(throwNoDockerImg).toHaveBeenCalled()

  })

})
