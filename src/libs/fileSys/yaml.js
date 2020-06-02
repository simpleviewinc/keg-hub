const { limbo } = require('jsutils')
const loadYamlFile = require('load-yaml-file')
const writeYamlFile = require('write-yaml-file')
const { pathExistsSync } = require('./fileSys')
const { ask } = require('../questions')
const { throwNoFileExists, generalError } = require('KegUtils/error')
const { confirmExec } = require('KegUtils/helpers')

/**
 * Loads a YAML file from a path and parses it
 * @function
 * @param {string} filePath - Path to the YAML file
 *
 * @returns {Object} - Parse YAML file
 */
const loadYml = async filePath => {
  return pathExistsSync(filePath)
    ? limbo(loadYamlFile(filePath))
    : throwNoFileExists(filePath, `Could not load YAML file!`)
}

/**
 * Writes a javascript object to a YAML file at the passed in path
 * Checks if the file exists first, then confirms overwrite
 * @function
 * @param {string} filePath - Location to write the YAML file to
 * @param {Object|Array} data - Data to write to the YAML file
 *
 * @returns {boolean} - If the YAML file could be written
 */
const writeYml = async (filePath, data) => {
  return confirmExec({
    confirm: `Overwrite YAML file => ${filePath}?`,
    success: `YAML file written successfully!`,
    cancel: `Write YAML file canceled!`,
    preConfirm: !pathExistsSync(filePath),
    execute: async () => {
      const [ err, _ ] = await limbo(writeYamlFile(filePath, data))
      return err ? generalError(err.stack) : true
    },
  })
}

module.exports = {
  loadYml,
  writeYml
}