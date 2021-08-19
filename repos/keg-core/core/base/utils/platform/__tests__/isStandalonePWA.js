import { Mocks, Utils } from 'KegMocks'

const validWindowMock = {
  matchMedia: () => ({ matches: true }),
}

const validNavMock = {
  standalone: true,
}

describe('Platform | isStandalonePWA', () => {
  beforeEach(() => {
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
    Mocks.resetMocks()
  })

  afterAll(() =>
    [ 'mockWindow', 'mockNavigator', 'isNativeMock' ].map(
      mockProperty => delete global[mockProperty]
    )
  )

  it('should return true for web through the window', () => {
    global.mockNavigator = {}
    global.mockWindow = validWindowMock
    global.isNativeMock = false

    expect(require('../isStandalonePWA').isStandalonePWA()).toEqual(true)
  })

  it('should return true for web through navigator', () => {
    global.mockNavigator = validNavMock
    global.mockWindow = {}
    global.isNativeMock = false

    expect(require('../isStandalonePWA').isStandalonePWA()).toEqual(true)
  })

  it('should return false for native', () => {
    global.mockNavigator = validNavMock
    global.mockWindow = validWindowMock
    global.isNativeMock = true

    expect(require('../isStandalonePWA').isStandalonePWA()).toEqual(false)
  })

  it('should return false for any platform without a navigator or window', () => {
    expect(require('../isStandalonePWA').isStandalonePWA()).toEqual(false)

    global.mockWindow = {}

    expect(require('../isStandalonePWA').isStandalonePWA()).toEqual(false)
  })
})
