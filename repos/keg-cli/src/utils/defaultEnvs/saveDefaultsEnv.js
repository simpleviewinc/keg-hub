const path = require('path')
const { Logger } = require('KegLog')
const { writeFile } = require('KegFileSys/fileSys')
const { DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')
const { generalError } = require('../error/generalError')

/**
 * Saves the Defaults.env file to the global config folder path
 * @param {string} content - Content to be saved to the defaults Envs file
 * @param {boolean} log - Should log any updates
 *
 * @returns {void}
 */
const saveDefaultsEnv = async (content, log) => {

  !content && generalError(`Can not save ${DEFAULT_ENV} with no content. This would remove all ENVs`)

  // Write the file to disk, overwriting the current defaults.env 
  await writeFile(path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV), content)

  log && Logger.success('\nGlobal ENVs saved!')

}

module.exports = {
  saveDefaultsEnv
}
