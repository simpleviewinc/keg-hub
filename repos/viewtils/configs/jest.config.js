const path = require('path')
const ROOT_DIR = path.join(__dirname, '../')

module.exports = {
  rootDir: '../',
  preset: "rollup-jest",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    `${ROOT_DIR}src/**/__tests__/**/*.js?(x)`
  ],
  collectCoverageFrom: [
    `${ROOT_DIR}src/index.js`
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
  testEnvironment: "node",
  setupFilesAfterEnv: [
    `${ROOT_DIR}configs/setupTests.js`
  ]
}