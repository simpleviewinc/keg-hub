import { Mocks, Redux } from 'SVMocks'
import { ActionTypes } from 'SVConstants'

const rethemeMock = { setDefaultTheme: jest.fn() }
const expoFontsMock = { loadAsync: jest.fn() }

jest.setMock('SVAssets/fonts', { fonts: {} })
jest.setMock('expo-font', expoFontsMock)
const kegComponentsThemeMock = jest.fn()
jest.setMock('../../../theme/kegComponentsTheme', { kegComponentsTheme: kegComponentsThemeMock })

Mocks.setMocks({ store: Redux.STORE, '@keg-hub/re-theme': rethemeMock })

const { initAppAction } = require('../initAppAction')

describe('initAppAction', () => {
  beforeEach(() => {
    kegComponentsThemeMock.mockClear()
    rethemeMock.setDefaultTheme.mockClear()
    Mocks.resetMocks()
  })

  it('should set initialized to true in the redux store', () => {
    initAppAction()
    const dispatchArgs = Redux.STORE.dispatch.mock.calls[0][0]

    expect(Redux.STORE.dispatch).toHaveBeenCalled()
    expect(dispatchArgs.type).toBe(ActionTypes.APP_INIT)
    expect(dispatchArgs.initialized).toBe(true)
  })

  it('should call kegComponentsTheme when a theme object is passed', async () => {
    expect(kegComponentsThemeMock).not.toHaveBeenCalled()
    await initAppAction({}, {})
    expect(kegComponentsThemeMock).toHaveBeenCalled()
  })

  it('should NOT call kegComponentsTheme when a theme function is passed', async () => {
    expect(kegComponentsThemeMock).not.toHaveBeenCalled()
    await initAppAction(jest.fn(), {})
    expect(kegComponentsThemeMock).not.toHaveBeenCalled()
  })

  it('should NOT call setDefaultTheme when NO theme object is passed', async () => {
    await initAppAction()
    expect(rethemeMock.setDefaultTheme).not.toHaveBeenCalled()
  })

  it('should call setDefaultTheme when a theme object is passed', async () => {
    expect(rethemeMock.setDefaultTheme).not.toHaveBeenCalled()
    await initAppAction({}, {})
    expect(rethemeMock.setDefaultTheme).toHaveBeenCalled()
  })

  it('should call the theme when its passed as a function', async () => {
    const themeFunc = jest.fn()
    await initAppAction(themeFunc)
    expect(themeFunc).toHaveBeenCalled()
  })

})
