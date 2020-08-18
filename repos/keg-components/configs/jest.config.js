const ROOT_DIR = require('app-root-path').path
const { aliases } = require('./aliases.config.js')
const { reduceObj } = require('@ltipton/jsutils')

const { PLATFORM, RE_PLATFORM } = process.env
const platform = PLATFORM || RE_PLATFORM

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
  '@expo/vector-icons',
  '@unimodules/.*',
  'expo-font'
].join('|')

module.exports = {
  rootDir: '../',
  preset: "jest-expo",
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1',
    ...mappedNames,
  },
  verbose: true,
  testPathIgnorePatterns: [ '/node_modules/' ],
  transformIgnorePatterns: [ `node_modules/(?!(${transpileForTests})/)` ],
  transform: {
    '^.+\\.js$': `${ROOT_DIR}/node_modules/react-native/jest/preprocessor.js`
  },
  testMatch: [
    `${ROOT_DIR}/src/**/__tests__/**/*.js?(x)`
  ],
  collectCoverageFrom: [
    'src/**/*{js,jsx}',
    '!src/assets/**/*'
  ],
  coverageDirectory: 'reports/coverage',
  moduleFileExtensions: [
    `${platform}.js`,
    "js",
    "json",
    "jsx",
    "es6"
  ],
  globals: {
    __DEV__: true
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [ `${ROOT_DIR}/setupTests.js` ]
}
