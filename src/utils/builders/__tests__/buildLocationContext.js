
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildLocationContext } = require('../buildLocationContext')

describe('buildLocationContext', () => {

  beforeEach(() => jest.resetAllMocks())
  
  it('should return an object with keys cmdContext, contextEnvs, location, and tap', async () => {

    const res = await buildLocationContext({
      globalConfig,
      params: { context: 'base' },
      task: testTask,
      envs: {},
    })

    const keys = [ 'cmdContext', 'contextEnvs', 'location', 'tap' ]
    Object.keys(res).map(key => expect(keys.indexOf(key)).not.toBe(-1))

  })

})
