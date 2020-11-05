const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const args = {
  core: [ { proxyDomain: 'core-develop' }, 'test.proxy.host' ],
  components: [ 'components-test.custom.proxy.host' ],
}

const { logVirtualUrl } = require('../logVirtualUrl')

describe('logVirtualUrl', () => {

  beforeEach(() => {
    Logger.pair.mockClear()
    Logger.warn.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('should return and call nothing if no params are passed', () => {
    const resp = logVirtualUrl()
    expect(resp).toBe(undefined)
  })

  it('should call Logger.pair', () => {
    logVirtualUrl(...args.core)
    expect(Logger.pair).toHaveBeenCalled()
  })

  it('should call Logger.warn', () => {
    logVirtualUrl(...args.core)
    expect(Logger.warn).toHaveBeenCalled()
  })

  it('should build and log the passed in url', () => {
    logVirtualUrl(...args.core)
    const coreUrl = Logger.pair.mock.calls[0][1]
    expect(coreUrl).toBe(`http://core-develop.test.proxy.host`)
  })

  it('should accept the first argument as a string only', () => {
    logVirtualUrl(...args.components)
    const componentsUrl = Logger.pair.mock.calls[0][1]
    expect(componentsUrl).toBe(`http://components-test.custom.proxy.host`)
  })

})