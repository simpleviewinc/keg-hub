
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildCmdContext } = require('../buildCmdContext')

describe('buildCmdContext', () => {

  afterAll(() => jest.resetAllMocks())
  
  it('should return context, cmdContext, tap and noPrefix keys', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { context: 'base' },
      allowed: [ 'base' ],
      askContainer: false
    })

    const resKeys = Object.keys(res)
    const keys = [ 'context', 'cmdContext', 'tap', 'noPrefix' ]

    keys.map(key => { expect(resKeys.indexOf(key)).not.toBe(-1) })

  })

  it('should cmdContext context and tap should be the same when no tap is set', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { context: 'base' },
      allowed: [ 'base' ],
      askContainer: false
    })

    expect(res.context).toBe('base')
    expect(res.cmdContext).toBe('base')
    expect(res.tap).toBe('base')

  })

  it('should cmdContext context should be tap when a tap value is passed in param', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { tap: 'test-tap' },
      allowed: [ 'tap' ],
      askContainer: false
    })
    
    expect(res.cmdContext).toBe('tap')
    expect(res.context).toBe('tap')
    expect(res.tap).toBe('test-tap')

  })


})
