const path = require('path')
const { isStr } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { parseContent } = require('KegFileSys/env')
const { readFile } = require('KegFileSys/fileSys')
const { saveDefaultsEnv } = require('./saveDefaultsEnv')
const { generalError } = require('../error/generalError')
const { DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')

/**
 * Removes an ENV from the Global Defaults.env file
 * @param {string} key - Name of the key to remove
 * @param {boolean} log - Should log any updates
 * @param {boolean} force - Force unset the env value
 * @param {boolean} comment - Should turn env into comment instead of removing
 *
 * @returns {void}
 */
const removeDefaultEnv = async ({ key, force, comment, log }) => {

  !isStr(key) && generalError(`An ENV key is required as an argument!`)
  
  // All envs are in upper case, so ensure the Key is also upper case
  const removeKey = key.toUpperCase()
  
  // Get the path to the global ENVs
  const globalEnvsPath = path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV)

  // Load the contents of the current env file
  const [ err, globalEnvString ] = await readFile(globalEnvsPath)
  let globalEnvStr = globalEnvString

  // Load the contents of the Global ENV file
  const globalEnvs = parseContent({
    file: globalEnvsPath,
    fill: false
  })

  const curENVStr = `${ removeKey }=${ globalEnvs[removeKey] }`
  const replace = new RegExp(`${curENVStr}`, 'g')

  globalEnvStr = comment
    ? globalEnvStr.replace(replace, `# ${curENVStr}`)
    : globalEnvStr.replace(replace, ``)

  await saveDefaultsEnv(globalEnvStr)

  log && Logger.success(`\nRemoved ${removeKey} from Global ENVs!`)

}

module.exports = {
  removeDefaultEnv
}
