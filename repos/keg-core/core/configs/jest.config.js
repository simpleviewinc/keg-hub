const kegPath = require('app-root-path').path

/**
 * Builds the correct paths when running tests based on TAP env
 * @param {*} tap - name of the tap to test
 *
 * @returns {Object} - paths for testing
 */
const buildTestPaths = () => {
  const rootDir = kegPath
  const moduleDirectories = ['node_modules']

  return {
    rootDir,
    moduleDirectories,
    testMatch: [
      `${rootDir}/**/__tests__/**/*.js?(x)`,
      `${rootDir}/**/?(*.)(test).js?(x)`,
    ],
    collectCoverageFrom: [ 'App.js', 'core/base/**/*.{js,jsx}' ],
    coverageDirectory: 'reports/coverage',
  }
}

/**
 * Setup keg paths
 */
const {
  collectCoverageFrom,
  coverageDirectory,
  moduleDirectories,
  testMatch,
  rootDir,
} = buildTestPaths()

/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
  'sv-keg',
  '@expo(nent)?/.*',
  '@react-native-community',
  '@react-navigation/.*',
  '@unimodules/.*',
  'expo(nent)?',
  'expo-asset',
  'expo-constants',
  'expo-font',
  '@simpleviewinc/re-theme',
  'react-clone-referenced-element',
  'react-native',
  'react-navigation',
  'react-router-native',
  'react-router',
  'react-router-dom',
  'sentry-expo',
  'unimodules',
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
  'mid',
].join('|')

module.exports = {
  rootDir,
  testMatch,
  collectCoverageFrom,
  coverageDirectory,
  moduleDirectories,
  preset: 'jest-expo',
  transform: {
    '^.+\\.js$': `${kegPath}/node_modules/react-native/jest/preprocessor.js`,
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1',
  },
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [`node_modules/(?!(${transpileForTests})/)`],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Keg Test Results',
        outputPath: '<rootDir>/reports/test-results.html',
      },
    ],
  ],
  testURL: 'http://localhost/',
  globals: {
    __DEV__: true,
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [`${kegPath}/core/scripts/js/setupTests.js`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
