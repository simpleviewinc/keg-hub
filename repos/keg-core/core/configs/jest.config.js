const path = require('path')
const kegPath = require('app-root-path').path

/**
 * Builds the correct paths when running tests based on TAP env
 * @param {*} tap - name of the tap to test
 *
 * @returns {Object} - paths for testing
 */
const buildTestPaths = () => {

  const rootDir = kegPath
  const moduleDirectories = [ 'node_modules' ]

  return {
    rootDir,
    moduleDirectories,
    testMatch: [
      `${rootDir}/**/__tests__/**/*.js?(x)`,
      `${rootDir}/**/?(*.)(test).js?(x)`,
    ],
    collectCoverageFrom: [ `${rootDir}/*.{js,jsx}`, ]
  }
}

/**
 * Setup keg paths
 */
const { collectCoverageFrom, moduleDirectories, testMatch, rootDir } = buildTestPaths()

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
  're-theme',
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
  'mid'
].join('|')

module.exports = {
  rootDir,
  testMatch,
  collectCoverageFrom,
  moduleDirectories,
  preset: 'jest-expo',
  transform: {
    '^.+\\.js$': `${kegPath}/node_modules/react-native/jest/preprocessor.js`
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1'
  },
  verbose: true,
  testPathIgnorePatterns: [ '/node_modules/', ],
  transformIgnorePatterns: [
    `node_modules/(?!(${transpileForTests})/)`
  ],
  reporters: [
    'default',
    'jest-html-reporters'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testURL: 'http://localhost/',
  globals: {
    __DEV__: true
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [ `${kegPath}/core/scripts/js/setupTests.js` ],
  snapshotSerializers: [ 'enzyme-to-json/serializer' ]
}
