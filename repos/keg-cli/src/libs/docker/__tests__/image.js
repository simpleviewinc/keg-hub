const Image = require('../image')

describe('Docker Image', () => {

  beforeAll(() => {
    // TODO: Call initDockerForTests
  })

  afterAll(() => jest.resetAllMocks())

  describe('inspect', () => {

    afterAll(() => jest.resetAllMocks())

    it('Should return the docker image information', async () => {

      const baseInfo = await Image.inspect({ image: 'keg-base' })
      expect(baseInfo).not.toBe(undefined)

    })

  })


})