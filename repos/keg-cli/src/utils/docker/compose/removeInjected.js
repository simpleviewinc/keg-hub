const path = require('path')
const { Logger } = require('KegLog')
const { removeFile, pathExists } = require('KegFileSys/fileSys')
const { GLOBAL_INJECT_FOLDER } = require('KegConst/constants')

/**
 * Removes an injected compose file from the global injected folder
 * @function
 * @param {string} injectedCompose - Path to the injected-compose.yml file
 *
 * @returns {Void}
 */
const removeInjected = async (name, log=true) => {
  try {
    const injectedCompose = path.join(GLOBAL_INJECT_FOLDER, `${name}.yml`)
    const [ err, exists ] = await pathExists(injectedCompose)
    exists && await removeFile(injectedCompose)
  }
  catch(err){
    log && Logger.error(err.stack)
  }

}

module.exports = {
  removeInjected
}