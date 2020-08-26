
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildContainerContext } = require('../buildContainerContext')

describe('buildContainerContext', () => {

  afterAll(() => jest.resetAllMocks())
  
  it('should return an object with keys cmdContext, contextEnvs, location, and tap', async () => {

    const res = await buildContainerContext({
      globalConfig,
      params: { context: 'base' },
      task: testTask,
      envs: {},
    })

    const resKeys = Object.keys(res)
    const keys = [ 'cmdContext', 'contextEnvs', 'location', 'tap', 'image', 'prefix' ]

    keys.map(key => { expect(resKeys.indexOf(key)).not.toBe(-1) })


  })

})
