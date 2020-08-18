const path = require('path')
const { isStr } = require('@ltipton/jsutils')
const { Logger } = require('KegLog')
const { parseContent } = require('KegFileSys/env')
const { readFile } = require('KegFileSys/fileSys')
const { saveDefaultsEnv } = require('./saveDefaultsEnv')
const { generalError } = require('../error/generalError')
const { DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')
const { ask } = require('askIt')

/**
 * Adds an ENV to the Global Defaults.env file
 * @param {string} key - Name of the key to add
 * @param {string} value - What the set the key too
 * @param {boolean} log - Should log any updates
 *
 * @returns {void}
 */
const addDefaultEnv = async (key, value, log) => {

  !isStr(key) && generalError(`An ENV key is required as the first argument!`)
  
  // All envs are in upper case, so ensure the Key is also upper case
  const addKey = key.toUpperCase()
  
  // Get the path to the global ENVs
  const globalEnvsPath = path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV)

  // Load the contents of the current env file
  const [ err, globalEnvString ] = await readFile(globalEnvsPath)

  // Load the contents of the Global ENV file
  const globalEnvs = await parseContent(
    globalEnvsPath,
    'utf8',
    false
  )

  const doUpdate = globalEnvs[addKey]
    ? await ask.confirm(`The Key ${addKey} already exists with value ${ globalEnvs[addKey] }. Do you want to overwrite it?`)
    : true

  return !doUpdate
    ? log && Logger.info(`Set Global ENV key was canceled!`)
    : await saveDefaultsEnv(`${ globalEnvString }\n${ addKey }=${ value }`)

}

module.exports = {
  addDefaultEnv
}
