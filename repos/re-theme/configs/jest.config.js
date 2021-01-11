const { getAliases } = require("./aliases.config")
const { reduceObj } = require("@keg-hub/jsutils")

/**
 * Map alias to use the jest-regex patterns
 */
const alias = reduceObj(getAliases('.js') || {}, (name, value, mappedAlias) => {
  mappedAlias[`^${name}(.*)$`] = `<rootDir>/${value}`
  return mappedAlias
})

/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
  'react-native-web',
].join('|')

module.exports = {
  rootDir: '../',
  preset: "rollup-jest",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.js?(x)"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  coverageDirectory: "reports/coverage",
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "es6"
  ],
  moduleNameMapper: alias,
  globals: {
    "__DEV__": true
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [ `node_modules/(?!(${transpileForTests})/)` ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/mocks"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/scripts/setupTests.js"
  ]
}