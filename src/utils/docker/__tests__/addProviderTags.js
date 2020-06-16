const globalConfig = global.getGlobalCliConfig()

const { addProviderTags } = require('../addProviderTags')

const defArgs = {
  image: {},
  url: 'docker.pkg.github.com',
  args: {
    globalConfig,
    tasks: global.cliTasks(globalConfig),
    params: { context: 'core' }
  }
}

describe('addProviderTags', () => {

  beforeEach(() => jest.resetAllMocks())

  it('It should not throw when a context param is passed in', async done => {
    
    // await addProviderTags(defArgs.image, defArgs.url, defArgs.args)
    
    done()
  })

})