jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const cssNoSelector = "{ color: blue; font-size: 12px; }"
const cssClassSelector = " .my-class { color: green; font-size: 22px; }"
const cssIDSelector = " #my-id { color: pink; font-size: 18px; }"
const cssDataSelector = "[data-attr~='my-data-attr'] { color: orange; font-size: 32px; }"
const cssRaw = "color: #111111; font-size: 9px;"

const { cssToJs } = require('../cssToJs')

describe('cssToJs', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should convert css string into JS object with NO selector', () => {

    const cssJs = cssToJs(cssNoSelector)

    expect(typeof cssJs).toBe('object')
    expect(cssJs.color).toBe('blue')
    expect(cssJs.fontSize).toBe('12px')

  })

  it('should convert css string into JS object with a class selector', () => {

    const cssJs = cssToJs(cssClassSelector)

    expect(typeof cssJs).toBe('object')
    expect(cssJs.color).toBe('green')
    expect(cssJs.fontSize).toBe('22px')

  })

  it('should convert css string into JS object with a id selector', () => {

    const cssJs = cssToJs(cssDataSelector)

    expect(typeof cssJs).toBe('object')
    expect(cssJs.color).toBe('orange')
    expect(cssJs.fontSize).toBe('32px')

  })

  it('should NOT convert css string into JS object without {}', () => {

    const cssJs = cssToJs(cssRaw)

    expect(typeof cssJs).toBe('object')
    expect(cssJs.color).toBe(undefined)
    expect(cssJs.fontSize).toBe(undefined)

  })


})
