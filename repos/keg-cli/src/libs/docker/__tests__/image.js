const Image = require('../image')

describe('Docker Image', () => {

  beforeAll(() => {
    // TODO: Call initDockerForTests
  })

  afterAll(() => jest.resetAllMocks())

  describe('inspect', () => {

    afterAll(() => jest.resetAllMocks())

    it('Should return the docker image information', async () => {

      // This is intended to work with _mocks__/helpers/initDockerForTests.js
      // But it's incomplete. Will uncomment this once initDockerForTests.js is finished
      // const baseInfo = await Image.inspect({ image: 'keg-base' })
      // expect(baseInfo).not.toBe(undefined)

    })

  })


})
