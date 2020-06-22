
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildContainerContext } = require('../buildContainerContext')

describe('buildContainerContext', () => {

  beforeEach(() => jest.resetAllMocks())
  
  it('should return an object with keys cmdContext, contextEnvs, location, and tap', async () => {

    const res = await buildContainerContext({
      globalConfig,
      params: { context: 'base' },
      task: testTask,
      envs: {},
    })

    const keys = [ 'cmdContext', 'contextEnvs', 'location', 'tap' ]
    Object.keys(res).map(key => expect(keys.indexOf(key)).not.toBe(-1))

  })

})
