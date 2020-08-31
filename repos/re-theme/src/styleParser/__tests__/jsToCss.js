jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const cssNoSelector = "{ color: blue; font-size: 12px; }"
const cssClassSelector = " .my-class { color: green; font-size: 22px; }"
const cssIDSelector = " #my-id { color: pink; font-size: 18px; }"
const cssDataSelector = "[data-attr~='my-data-attr'] { color: orange; font-size: 32px; }"
const cssRaw = "color: #111111; font-size: 9px;"


const styleObj = { 
  '.my-color': {
    color: "#111111",
    '.first-level': {
      backgroundColor: '#2f2f2f',
      marginTop: 10
    }
  },
  
  '.my-color .first-level': {
    marginTop: "40px",
    '.second-level': {
      marginLeft: 31,
    } 
  }
}

const { jsToCss } = require('../jsToCss')

describe('jsToCss', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should convert JS object into css string with NO selector', () => {

    // const cssJs = jsToCss(cssNoSelector)

  })


})
