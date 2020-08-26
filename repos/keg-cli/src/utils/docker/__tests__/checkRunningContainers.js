const { docker } = require('KegMocks/libs/docker')

const container = global.testDocker.containers.core
jest.setMock('KegDocCli', docker)


const { checkRunningContainers } = require('../checkRunningContainers')


describe('checkRunningContainers', () => {

  afterAll(() => jest.resetAllMocks())

  it('should call docker.container.ps to get a list of all containers', async done => {

    await checkRunningContainers()

    expect(docker.container.ps).toHaveBeenCalled()

    done()
  })

  it('should return a list of running containers managed by the Keg-CLI', async done => {

    const containers = await docker.container.list()
    const ids = containers.map(cont => { return cont.id })

    expect(containers.length).toBe(3)

    const running = await checkRunningContainers()

    expect(running.length).toBe(2)

    done()
  })

  it('should NOT return containers NOT managed by the Keg-CLI', async done => {

    const containers = await docker.container.list()
    const random = containers.find(cont => cont.name === 'test-random')

    expect(random).not.toBe(undefined)
    expect(random.name).toBe('test-random')

    const running = await checkRunningContainers()

    running.map(run => {
      expect(run.id).not.toBe(random.id)
      expect(run.name).not.toBe(random.name)
    })

    done()
  })

})