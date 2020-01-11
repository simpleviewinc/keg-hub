const ROOT_DIR = require('app-root-path').path
const { aliases } = require('./aliases.config.js')
const { reduceObj } = require('jsutils')

const mappedNames = reduceObj(aliases, (key, value, updated) => {
  updated[key] = `${ROOT_DIR}/${value}`
  return updated
}, {})

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

/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
  'react-native',
].join('|')

module.exports = {
  rootDir: '../',
  preset: "rollup-jest",
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1',
    ...mappedNames,
  },
  verbose: true,
  testPathIgnorePatterns: [ '/node_modules/' ],
  transformIgnorePatterns: [ `node_modules/(?!(${transpileForTests})/)` ],
  transform: {
    // '^.+\\.js$': "babel-jest",
    '^.+\\.js$': `${ROOT_DIR}/node_modules/react-native/jest/preprocessor.js`
  },
  testMatch: [
    `${ROOT_DIR}/src/**/__tests__/**/*.js?(x)`
  ],
  collectCoverageFrom: [
    `${ROOT_DIR}/src/index.js`
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "es6"
  ],
  globals: {
    __DEV__: true
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [ `${ROOT_DIR}/setupTests.js` ],
  // snapshotSerializers: [ 'enzyme-to-json/serializer' ]
}