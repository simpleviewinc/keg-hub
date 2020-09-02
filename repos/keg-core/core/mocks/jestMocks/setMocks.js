import { resetMocks } from './resetMocks'

const path = require('path')
const { isObj, mapObj } = require('@keg-hub/jsutils')
const BASE_PATH = path.join('../../base')
const packageConf = require('../../../package.json')
const TESTS_FOLDER = '/__tests__/'

/**
 * Get all node modules keys as an array
 * When a key is passed in that matches a node_module
 * DON'T update the path
 */
const noPathUpdate = Array.from([
  // Add other no path update paths here ...
])
  .concat(Object.keys(packageConf.dependencies))
  .concat(Object.keys(packageConf.devDependencies))

/**
 * Finds the parent test module that called the setMocks method
 * Use the test modules path as a relative path to find the correct file to be mocked
 * @param {Object} parentMod - module object of the a file
 *
 * @returns {string} - path to the test file that called setMock
 */
const findTestFile = parentMod => {
  return parentMod.filename.indexOf(TESTS_FOLDER) !== -1
    ? parentMod.filename
    : findTestFile(parentMod.parent)
}

/**
 * Gets the path to the module to be mocked based on the passed in file path
 * Defaults to <root_dir>/core/base
 * @param {string} filePath - initial path to the file to be mocked
 *
 * @returns {string} - path to the module to be mocked
 */
const getPath = filePath => {
  const parentPath = findTestFile(module.parent)
  const split = parentPath.split('/')
  split.pop()

  return path.resolve(split.join('/'), filePath)
}

/**
 * Returns the relative path or path from the <root_dir>/core/base
 * @param {string} filePath - initial path to the file to be mocked
 *
 * @returns {string} - path to the module to be mocked
 */
const getMockPath = filePath => {
  // If in the noPathUpdate array, just return the original value
  return noPathUpdate.indexOf(filePath) !== -1
    ? filePath
    : filePath.indexOf('../') !== 0
      ? path.join(BASE_PATH, filePath)
      : getPath(filePath)
}

export const setMocks = (toMock, reset) => {
  reset && resetMocks()
  isObj(toMock) &&
    mapObj(toMock, (key, value) => {
      jest.setMock(getMockPath(key), value)
    })
}
