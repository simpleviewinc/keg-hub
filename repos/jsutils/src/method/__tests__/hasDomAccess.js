const { hasDomAccess } = require('../')

const setCustomWindow = windowObj => {
  const orgWindow = global.window
  global.window = windowObj

  return () => global.window = orgWindow
}

describe('hasDomAccess', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return false if window does not exist', () => {
    const reset = setCustomWindow(undefined)
    expect(hasDomAccess()).toBe(false)
    reset()
  })

  it('should return false if window does not have a document property', () => {
    const reset = setCustomWindow({})
    expect(hasDomAccess()).toBe(false)
    reset()
  })

  it('should return false if window.document does not have a createElement property', () => {
    const reset = setCustomWindow({ document: {} })
    expect(hasDomAccess()).toBe(false)
    reset()
  })

  it('should return true if window.document.createElement property exists', () => {
    const reset = setCustomWindow({ document: { createElement: () => {} } })
    expect(hasDomAccess()).toBe(true)
    reset()
  })

})

