import { Mocks, Utils } from 'KegMocks'

const mockValidNavigator = {
  userAgent: 'iPhone',
}

describe('Platform | isIOSWeb', () => {
  beforeAll(() => {
    Mocks.setMocks({
      'utils/platform/getNavigator': { getNavigator: Utils.getNavigatorMock },
      'utils/platform/getWindow': { getWindow: Utils.getWindowMock },
      'utils/platform/isNative': { isNative: Utils.isNativeMock },
    })
  })
  afterEach(() => {
    global.mockWindow = undefined
    global.mockNavigator = undefined
    global.isNativeMock = false
  })

  afterAll(() => Mocks.resetMocks())

  it('should return false on non-web platforms', () => {
    const isIOSWeb = require('../isIOSWeb').isIOSWeb
    expect(isIOSWeb()).toBe(false)

    global.isNativeMock = true
    global.mockWindow = {}
    global.mockNavigator = mockValidNavigator
    expect(isIOSWeb()).toBe(false)
  })

  it('should return true when the system is ios web', () => {
    global.isNativeMock = false
    global.mockWindow = {}
    global.mockNavigator = mockValidNavigator
    const result = require('../isIOSWeb').isIOSWeb()
    expect(result).toBe(true)
  })
})
