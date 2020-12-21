const path = require('path')
const { isStr } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { parseContent } = require('KegFileSys/env')
const { readFile } = require('KegFileSys/fileSys')
const { saveDefaultsEnv } = require('./saveDefaultsEnv')
const { removeDefaultEnv } = require('./removeDefaultEnv')
const { generalError } = require('../error/generalError')
const { DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')
const { ask } = require('@keg-hub/ask-it')

/**
 * Adds an ENV to the Global Defaults.env file
 * @param {string} key - Name of the key to add
 * @param {string} value - What the set the key too
 * @param {boolean} force - Force set the env value
 * @param {boolean} log - Should log any updates
 *
 * @returns {void}
 */
const addDefaultEnv = async ({ key, value, force, log }) => {

  !isStr(key) && generalError(`An ENV key is required as the first argument!`)
  
  // All envs are in upper case, so ensure the Key is also upper case
  const addKey = key.toUpperCase()
  
  // Get the path to the global ENVs
  const globalEnvsPath = path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV)

  // Load the contents of the current env file
  let [ envErr, globalEnvString ] = await readFile(globalEnvsPath)
  envErr && generalError(envErr)

  // Load the contents of the Global ENV file
  const globalEnvs = parseContent({
    file: globalEnvsPath,
    fill: false
  })

  const alreadyExists = globalEnvs[addKey]

  const doUpdate = !force && alreadyExists
    ? await ask.confirm(`The Key ${addKey} already exists with value ${ globalEnvs[addKey] }. Do you want to overwrite it?`)
    : true

  if(!doUpdate)
    return log && Logger.info(`Set Global ENV key was canceled!`)

  // If the ENV already exists, remove it, then reload the ENV file
  if(alreadyExists){
    // Remove the old ENV if it already exists
    await removeDefaultEnv({ key, force: true })

    // Reload the envs if the keg was removed so it has the updated content without the env
    const [ reloadErr, globalEnvStringReload ] = await readFile(globalEnvsPath)
    reloadErr && generalError(reloadErr)

    // Reset the env string with the reloaded content
    globalEnvStringReload && (globalEnvString = globalEnvStringReload)
  }

  return saveDefaultsEnv(`${ globalEnvString }\n${ addKey }=${ value }`)

}

module.exports = {
  addDefaultEnv
}
