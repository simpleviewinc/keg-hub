const yaml = require('js-yaml')
const { ask } = require('askIt')
const writeYamlFile = require('write-yaml-file')
const { confirmExec } = require('KegUtils/helpers/confirmExec')
const { parseTemplate } = require('./parseTemplate')
const { limbo, deepMerge, isStr } = require('@ltipton/jsutils')
const { throwNoFileExists, generalError } = require('KegUtils/error')
const { pathExistsSync, pathExists, removeFile, readFileSync, readFile } = require('./fileSys')


/**
 * Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
 * <br/> conversion translates it to FEFF (UTF-16 BOM)
 * @function
 * @param {string} content - Content of the loaded yml file
 *
 * @returns {Object} - stripped string
 */
const stripBom = content => (
  content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content
)

/**
 * Parses the yml content to replaces any template values from the globalConfig
 * <br/> Then converts it into a JS Object with the `yaml.safeLoad` call
 * @function
 * @param {string} content - Content of the loaded yml file
 *
 * @returns {Object} - Parse YAML file as a JS Object
 */
const loadTemplateYml = content => yaml.safeLoad(parseTemplate({ template: stripBom(content) }))

/**
 * Read the content of a yml file
 * @function
 * @param {string} filePath - Path to the YAML file
 * @param {boolean} throwError - If an error should be thrown when yml file does not exist
 *
 * @returns {Object} - Parse YAML file
 */
const loadYamlFile = async (filePath, throwError=true) => {
  const [ err, content ] = await readFile(filePath)
  return !err
    ? loadTemplateYml(content)
    : throwError
      ? throwNoFileExists(filePath, `Could not load YAML file!`)
      : {}
}


/**
 * Loads a YAML file from a path and parses it synchronously
 * @function
 * @param {string} filePath - Path to the YAML file
 * @param {boolean} throwError - If an error should be thrown when yml file does not exist
 *
 * @returns {Object} - Parse YAML file
 */
const loadYmlSync = (filePath, throwError=true) => {
  return pathExistsSync(filePath)
    ? loadTemplateYml(readFileSync(filePath))
    : throwError ? throwNoFileExists(filePath, `Could not load YAML file!`) : {}
}


/**
 * Loads a YAML file from a path and parses it
 * @function
 * @param {string} filePath - Path to the YAML file
 * @param {boolean} throwError - If an error should be thrown when yml file does not exist
 *
 * @returns {Object} - Parse YAML file
 */
const loadYml = async (filePath, throwError=true) => {
  const [ err, _ ] = await limbo(pathExists(filePath))
  const data = !err
    ? await loadYamlFile(filePath, throwError)
    : throwError
      ? throwNoFileExists(filePath, `Could not load YAML file!`) 
      : {}

  return data
}

/**
 * Writes a javascript object to a YAML file at the passed in path
 * Checks if the file exists first, then confirms overwrite
 * @function
 * @param {string} filePath - Location to write the YAML file to
 * @param {Object|Array} data - Data to write to the YAML file
 * @param {boolean} preConfirm - Bypass ask to overwrite existing file
 *
 * @returns {boolean} - If the YAML file could be written
 */
const writeYml = async (filePath, data, preConfirm) => {
  return confirmExec({
    confirm: `Overwrite YAML file => ${filePath}?`,
    success: `YAML file written successfully!`,
    cancel: `Write YAML file canceled!`,
    preConfirm: preConfirm || !pathExistsSync(filePath),
    execute: async () => {
      const [ err, _ ] = await limbo(writeYamlFile(filePath, data))
      return err ? generalError(err.stack) : true
    },
  })
}

/**
 * Loads multiple yml files from an array of passed in files paths
 * <br/> Then merges them all together
 * @function
 * @param {Array} ymlFiles - Array of files paths to load
 *
 * @returns {Object} - Merged ymlFiles as an Object
 */
const mergeYml = async (...ymlFiles) => {

  const loadedYmls = await Promise.all(
    await ymlFiles.reduce(async (toResolve, file) => {
      const loaded = await toResolve
      const loadedYml = await isStr(file) && loadYml(file)
      loadedYml && loaded.push(loadedYml)

      return loaded
    }, Promise.resolve([]))
  )

  return deepMerge(...loadedYmls)

}

/**
 * Removes a yml file from the local file system
 * @function
 * @param {Array} filePath - Path to the yml file
 *
 * @returns {boolean} - If the file could be removed
 */
const removeYml = async filePath => {
  !isStr(filePath) && generalError(`Yaml remove requires a string file path!`, filePath)

  const [ err, removed ] = await removeFile(filePath)
  return err ? generalError(err) : removed
}

const yml = {
  load: loadYml,
  loadSync: loadYmlSync,
  merge: mergeYml,
  remove: removeYml,
  write: writeYml,
}

module.exports = {
  loadYml,
  loadYmlSync,
  mergeYml,
  removeYml,
  writeYml,
  yml,
}
