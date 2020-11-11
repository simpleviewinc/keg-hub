const ROOT_DIR = require('app-root-path').path
const { getAliases } = require('./aliases.config.js')
const { reduceObj } = require('@keg-hub/jsutils')
const platform = process.env.RE_PLATFORM || process.env.PLATFORM || 'web'

const mappedNames = reduceObj(getAliases(''), (key, value, updated) => {
  updated[key] = `${ROOT_DIR}/${value}`
  return updated
}, {})

/**
 * Asset types that should be stubbed out when tests run
 */
const assetStubs = [
  'bmp',
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
  '@unimodules/.*',
  'expo-font',
].join('|')

module.exports = {
  rootDir: '../',
  preset: "jest-expo",
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    [`^.+\\.(${assetStubs})$`]: 'jest-static-stubs/$1',
    ...mappedNames,
    '@keg-hub/re-theme/colors': `${ROOT_DIR}/node_modules/@keg-hub/re-theme/build/cjs/web/colors.js`,
    '@keg-hub/re-theme/styleInjector': `${ROOT_DIR}/node_modules/@keg-hub/re-theme/build/cjs/web/styleInjector.js`,
    '@keg-hub/re-theme/styleParser': `${ROOT_DIR}/node_modules/@keg-hub/re-theme/build/cjs/web/styleParser.js`,
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
