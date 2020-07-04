const path = require('path')
const { deepMerge } = require('@ltipton/jsutils')
const { Logger } = require('KegLog')
const { CLI_ROOT, DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')
const { writeFile, readFile } = require('KegFileSys/fileSys')
const { parseContent } = require('KegFileSys/env')
const packConf = require('KegRoot/package.json')

/**
 * Loads the content of the current default.env
 * <br/>Then checks if all the keys have been added from keg-cli defaults.env file
 * @param {boolean} log - Should log message about syncing default.env file
 *
 * @returns {void}
 */
const mergeDefaultEnv = async log => {

  // Load the contents of the current env file
  const [ err, curEnvStr ] = await readFile(path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV))

  // Load the original defaults ENV file
  const originalDefENV = parseContent(
    path.join(CLI_ROOT, 'scripts/setup/', DEFAULT_ENV),
    'utf8',
    false
  )

  // Build the string to do the version update
  const updateString = `\n# ----- VERSION UPDATE: ${ packConf.version } ----- #\n`

  // Loop the envs from the keg-cli, and add them to the defaults.env if they don't exist
  const envsToAdd = Object.keys(originalDefENV).reduce((envStr, key) => {
    // Check the current Env file for the key
    // If it doesn't exist, then add it to the end of the file
    return curEnvStr.indexOf(`${key}=`) === -1
      ? `${envStr}${key}=${ originalDefENV[key] }\n`
      : envStr
  }, updateString)

  // Check if there's envs to add
  if(updateString === envsToAdd)
    return log && Logger.info(`The global ${ DEFAULT_ENV } file is up to date!\n`)

  // Write the file to disk, overwriting the current defaults.env 
  log && Logger.info(`Updating global ${ DEFAULT_ENV } file!\n`)
  await writeFile(
    path.join(GLOBAL_CONFIG_FOLDER, DEFAULT_ENV),
    `${ curEnvStr }\n${ envsToAdd }`
  )

}

module.exports = { 
  mergeDefaultEnv
}