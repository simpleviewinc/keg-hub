import { Mocks, Utils } from 'KegMocks'

describe('Platform | isIframe', () => {
  beforeEach(() => {
    Mocks.setMocks({
      'utils/platform/getWindow': { getWindow: Utils.getWindowMock },
    })
  })

  afterEach(() => {
    global.mockWindow = undefined
    Mocks.resetMocks()
  })

  afterAll(() => {
    delete global.mockWindow
  })

  it('should return true if inside an iFrame', () => {
    global.mockWindow = {
      location: 'foo',
      parent: {
        location: 'bar'
      }
    }
    expect(require('../isIframe').isIframe()).toBe(true)
  })

  it('should return false if not inside an iframe', () => {
    global.mockWindow = {
      location: 'foo',
      parent: {
        location: 'foo'
      }
    }
    expect(require('../isIframe').isIframe()).toBe(false)
  })
})
