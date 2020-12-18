const dockerCmds = require('KegMocks/libs/docker/commands')
const { isArr, get } = require('@keg-hub/jsutils')

jest.setMock('../commands', dockerCmds)

const Image = require('../image')

const resetDockerMocks = () => {
  dockerCmds.dockerCli.mockClear()
  dockerCmds.remove.mockClear()
}

describe('Docker Image', () => {

  afterAll(() => jest.resetAllMocks())

  describe('get', () => {

    beforeEach(() => {
      resetDockerMocks()
    })

    it('Should return a docker image', async () => {

      const baseImg = await Image.get('keg-base')
      expect(baseImg.rootId).toBe('keg-base')
      expect(baseImg.id).toBe('3b74af475ff2')

      const tapImg = await Image.get('tap')
      expect(tapImg.rootId).toBe('tap')
      expect(tapImg.id).toBe('a2aba7cf204f')

    })

    it('Should call the docker cli to get all images', async () => {

      expect(dockerCmds.dockerCli).not.toHaveBeenCalled()
      const baseImg = await Image.get('keg-base')
      expect(dockerCmds.dockerCli).toHaveBeenCalled()

      const cmdOpts = get(dockerCmds, 'dockerCli.mock.calls.0.0.opts')
      expect(cmdOpts[0]).toBe('image')
      expect(cmdOpts[1]).toBe('ls')

      const format = get(dockerCmds, 'dockerCli.mock.calls.0.0.format')
      expect(format).toBe('json')

    })

    it('Should accept a callback method as the second argument', async () => {

      const findCb = jest.fn((image, imgRef, tag) => image.rootId === 'keg-base')
      const baseImg = await Image.get('keg-base', findCb)
      
      expect(findCb).toHaveBeenCalled()
      expect(baseImg.rootId).toBe('keg-base')
      expect(baseImg.id).toBe('3b74af475ff2')

    })

    it('Should find an image with a tag if it exists', async () => {

      const baseImg = await Image.get('keg-base:latest')
      expect(baseImg.rootId).toBe('keg-base')
      expect(baseImg.id).toBe('3b74af475ff2')

      const coreImg = await Image.get('keg-core:0.0.1')
      expect(coreImg.rootId).toBe('keg-core')
      expect(coreImg.id).toBe('b80dcb1cac10')

    })

    it('Should not find an image with a tag if it does not exists', async () => {

      const baseImg = await Image.get('keg-base:test-invalid')
      expect(baseImg).toBe(undefined)

      const coreImg = await Image.get('keg-core:2.5.0')
      expect(coreImg).toBe(undefined)

    })

    it('Should find an image from ID', async () => {

      const baseImg = await Image.get('3b74af475ff2')
      expect(baseImg.rootId).toBe('keg-base')
      expect(baseImg.id).toBe('3b74af475ff2')

      const componentsImg = await Image.get('a56406239194')
      expect(componentsImg.rootId).toBe('keg-components')
      expect(componentsImg.id).toBe('a56406239194')

    })

    it('Should get an image if the ID is passed with a tag that exists', async () => {

      const componentsImg = await Image.get('a56406239194:0.0.1')
      expect(componentsImg.rootId).toBe('keg-components')
      expect(componentsImg.id).toBe('a56406239194')

    })

    it('Should not return an image if the ID matches but tag does not', async () => {

      const baseImg = await Image.get('3b74af475ff2:invalid')
      expect(baseImg).toBe(undefined)

    })

  })

  describe('list', () => {

    beforeEach(() => {
      resetDockerMocks()
    })

    it('Should return an array of all images', async () => {

      const images = await Image.list()
      expect(isArr(images)).toBe(true)
      expect(images.length).toBe(Object.values(global.testDocker.images).length)

    })

    it('should pass the image ls command to docker', async () => {

      const images = await Image.list()
      const cmdOpts = get(dockerCmds, 'dockerCli.mock.calls.0.0.opts')
      expect(cmdOpts[0]).toBe('image')
      expect(cmdOpts[1]).toBe('ls')

      const format = get(dockerCmds, 'dockerCli.mock.calls.0.0.format')
      expect(format).toBe('json')

    })

    it('should allow overwriting the format option', async () => {

      const images = await Image.list({ format: 'test-format' })
      const format = get(dockerCmds, 'dockerCli.mock.calls.0.0.format')
      expect(format).toBe('test-format')

    })

   it('should all other arguments to the dockerCLI method', async () => {

      const images = await Image.list({ testArg: 'I am a test arg' })
      const testArg = get(dockerCmds, 'dockerCli.mock.calls.0.0.testArg')
      expect(testArg).toBe('I am a test arg')

    })

  })

  describe('remove', () => {

    beforeEach(() => {
      resetDockerMocks()
    })

    it('Should call the docker remove command', async () => {

      expect(dockerCmds.remove).not.toHaveBeenCalled()
      const response = await Image.remove()
      expect(dockerCmds.remove).toHaveBeenCalled()

    })

    it('Should set the type to image', async () => {

      const noTypeRes = await Image.remove()
      const noArgs = get(dockerCmds, 'remove.mock.calls.0.0')
      expect(noArgs.type).toBe('image')

      const typeRes = await Image.remove({ type: 'test' })
      const argTypeTest = get(dockerCmds, 'remove.mock.calls.1.0')
      expect(argTypeTest.type).toBe('image')

    })

   it('should all other arguments to the remove method', async () => {

      const images = await Image.remove({ testArg: 'I am a test arg' })
      const testArg = get(dockerCmds, 'remove.mock.calls.0.0.testArg')
      expect(testArg).toBe('I am a test arg')

    })

  })

})
