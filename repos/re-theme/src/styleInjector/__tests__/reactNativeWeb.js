jest.resetModules()
jest.resetAllMocks()

const {
  createReactDOMStyle,
  createCompileableStyle,
  flattenStyle,
  prefixStyles,
} = require('../reactNativeWeb')

describe('reactNativeWeb', () => {
  test(`react-native-web imports should be function`, () => {
    expect(typeof createReactDOMStyle).toBe('function')
    expect(typeof createCompileableStyle).toBe('function')
    expect(typeof flattenStyle).toBe('function')
    expect(typeof prefixStyles).toBe('function')
  })
})
