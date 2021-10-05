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
    global.mockWindow = { parent: {} }
    expect(require('../').isIframe()).toBe(true)
  })

  it('should return false if not inside an iframe', () => {
    global.mockWindow = {}
    global.mockWindow.parent = global.mockWindow
    expect(require('../').isIframe()).toBe(false)
  })
})
