const ROOT_DIR = require('app-root-path').path
const { TAP } = process.env

/**
 * Builds the correct paths when running tests based on TAP env
 * @param {*} tap - name of the tap to test
 *
 * @returns {Object} - paths for testing
 */
const buildTestPaths = (tap) => {

  const testPath = tap
    ? `${ROOT_DIR}/taps/${tap}`
    : `${ROOT_DIR}/core/base`
    
  return {
    rootDir: testPath,
    testMatch: [
      `${testPath}/**/__tests__/**/*.js?(x)`,
      `${testPath}/**/?(*.)(test).js?(x)`,
    ],
    collectCoverageFrom: [
      `${testPath}/*.{js,jsx}`,
    ]
  }
}

/**
 * Get the paths base on the TAP ENV
 */
const { collectCoverageFrom, testMatch, rootDir } = buildTestPaths(TAP)

/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
  'react-native',
  'material-bread',
  'react-native-vector-icons',
  'react-native-firebase',
  're-theme',
  'react-router-native',
  'react-router',
  'react-router-dom'
].join('|')

/**
 * Asset types that should be stubbed out when tests run
 */
const assetStubs = [
  'jpg',
  'jpeg',
  'gif',
  'png',
  'mp4',
  'mkv',
  'avi',
  'webm',
  'swf',
  'wav',
  'mid'
].join('|')

module.exports = {
  rootDir,
  testMatch,
  collectCoverageFrom,
  preset: 'react-native',
  transform: {
    '^.+\\.js$': `${ROOT_DIR}/node_modules/react-native/jest/preprocessor.js`
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1'
  },
  verbose: true,
  testPathIgnorePatterns: [ '/node_modules/' ],
  transformIgnorePatterns: [ `node_modules/(?!(${transpileForTests})/)` ],
  "reporters": [
    "default",
    "jest-html-reporters"
  ],
  "reporters": [
    "default",
    "jest-html-reporters"
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testURL: 'http://localhost/',
  globals: {
    __DEV__: true
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [ `${ROOT_DIR}/core/scripts/js/setupTests.js` ],
  snapshotSerializers: [ 'enzyme-to-json/serializer' ]
}
