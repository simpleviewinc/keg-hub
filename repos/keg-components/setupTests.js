
// By default mock react-native-svg to react-native-svg-web
jest.mock('react-native-svg', () => require('react-native-svg-web'))

const jsdom = require('jsdom').jsdom
global.testMocks = global.testMocks || {}
