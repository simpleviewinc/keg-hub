const { Logger } = require('KegMocks/logger')
jest.setMock('KegLog', { Logger })

const { logVirtualUrl } = require('../logVirtualUrl')

describe('logVirtualUrl', () => {

  beforeEach(() => jest.resetAllMocks())
  
  it('should call Logger.pair', () => {
    logVirtualUrl()
    expect(Logger.pair).toHaveBeenCalled()
  })

  it('should call Logger.warn', () => {
    logVirtualUrl()
    expect(Logger.warn).toHaveBeenCalled()
  })

})