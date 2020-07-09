const { docker } = require('KegMocks/libs/docker')
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()
jest.setMock('KegDocCli', docker)


const { buildBaseImg } = require('../buildBaseImg')

describe('buildBaseImg', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return an object with keys cmdContext, contextEnvs, location, and tap', () => {


  })

})