
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const { buildCmdContext } = require('../buildCmdContext')

describe('buildCmdContext', () => {

  afterAll(() => jest.resetAllMocks())
  
  it('should return context, cmdContext, tap and noPrefix keys', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { context: 'base' },
      askFor: false
    })

    const resKeys = Object.keys(res)
    const keys = [ 'context', 'cmdContext', 'tap', 'noPrefix' ]

    keys.map(key => { expect(resKeys.indexOf(key)).not.toBe(-1) })

  })

  it('should cmdContext context and tap should be the same when no tap is set', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { context: 'base' },
      askFor: false
    })

    expect(res.context).toBe('base')
    expect(res.cmdContext).toBe('base')
    expect(res.tap).toBe('base')

  })

  it('should return cmdContext and context as tap when param.tap has a value', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { tap: 'test-tap' },
      askFor: false
    })

    expect(res.cmdContext).toBe('tap')
    expect(res.context).toBe('tap')
    expect(res.tap).toBe('test-tap')

  })

  it('should return correct context data when image param is passed in', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { image: 'keg-core' },
      askFor: false
    })

    expect(res.cmdContext).toBe('core')
    expect(res.context).toBe('core')
    expect(res.tap).toBe('core')
    expect(res.noPrefix).toBe('keg-core')

  })

  it('should return correct context data when container param is passed in', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { image: 'keg-regulator' },
      askFor: false
    })

    expect(res.cmdContext).toBe('regulator')
    expect(res.context).toBe('regulator')
    expect(res.tap).toBe('regulator')
    expect(res.noPrefix).toBe('keg-regulator')

  })

  it('should return a prefix when context has a prefix', async () => {

    const res = await buildCmdContext({
      globalConfig,
      params: { image: 'img-keg-regulator' },
      askFor: false
    })

    expect(res.prefix).toBe('img-keg-regulator')

    const res2 = await buildCmdContext({
      globalConfig,
      params: { context: 'img-keg-regulator' },
      askFor: false
    })

    expect(res2.prefix).toBe('img-keg-regulator')

    const res3 = await buildCmdContext({
      globalConfig,
      params: { container: 'img-keg-regulator' },
      askFor: false
    })

    expect(res2.prefix).toBe('img-keg-regulator')

  })

})
