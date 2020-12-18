const { docker } = require('KegMocks/libs/docker')
const globalConfig = global.getGlobalCliConfig()
const container = global.testDocker.containers.core

jest.setMock('KegDocCli', docker)

const { getFromImage } = require('../getFromImage')

describe('getFromImage', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return true when passed in arg is a help arg', () => {
    
  })

})