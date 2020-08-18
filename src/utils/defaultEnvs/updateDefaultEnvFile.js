const path = require('path')
const { Logger } = require('KegLog')
const { ask } = require('askIt')
const packConf = require('KegRoot/package.json')
const { capitalize } = require('@ltipton/jsutils')
const { parseContent } = require('KegFileSys/env')
const { readFile } = require('KegFileSys/fileSys')
const { saveDefaultsEnv } = require('./saveDefaultsEnv')
const { CLI_ROOT, DEFAULT_ENV, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')

/**
 * Logs the changes to the global Defaults.env
 * @param {string} stats - Holds the changes to be made to the file
 * @param {string} force - If we should force the changes
 *
 * @returns {boolean} - If the changes should be made
 */
const askForUpdate = async (stats, force, conflict) => {

  Logger.print(stats.add.join('\n'))
  
  if(force || !stats.conflict.length) return true

  Logger.warn(`Using ${ conflict } for conflict!\n`)

  Logger.print(stats.conflict.join('\n'))

  return ask.confirm(`Do you want to save the changes?`)
}

/**
 * Saves the Defaults.env file to the global config folder path
 * @param {string} envsToAdd - ENVs to add to the file
 * @param {string} existingEnvs - Current ENVs that already exist
 * @param {boolean} log - Should log any updates
 *
 * @returns {void}
 */
const saveENVFile = async params => {
  const { conflict, envsToAdd, existingEnvs, force, stats, log } = params

  const doUpdate = await askForUpdate(stats, force, conflict)
  if(!doUpdate) return Logger.warn(`\nCanceling Defaults.env sync!`)

  // Check if there's envs to add
  if(!envsToAdd)
    return log && Logger.info(`The global ${ DEFAULT_ENV } file is up to date!\n`)

  // // Build the string to do the version update
  const updatedENVs = `\n# ----- VERSION UPDATE: ${ packConf.version } ----- #\n${ envsToAdd }`

  // Write the file to disk, overwriting the current defaults.env 
  log && Logger.info(`Updating global ${ DEFAULT_ENV } file!\n`)

  await saveDefaultsEnv(`${ existingEnvs }\n${ updatedENVs }`)

  Logger.success('\nGlobal ENVs synced!')

}

/**
 * Updates the stats object
 * @param {Object} stats - Path where to save the global Defaults config file
 * @param {string} type - ENVs to add to the file
 * @param {Object} params - Current ENVs that already exist
 *
 * @returns {void}
 */
const updateStats = (stats, type, params) => {
  const { conflict, key, lValue, gValue } = params
  const found = `${ capitalize(type) }ing key/value pair\n`

  if(type === 'add'){
    const localData = lValue && Logger.colors.green(`  ${key}=${lValue}\n`)
    localData && stats[type].push(`${ found }${ localData }`)

    return stats
  }

  // Figure out the logging color for local and global based on the conflict
  localLog = conflict === 'global' && type !== 'add'
    ? Logger.colors.red
    : Logger.colors.green

  globalLog = conflict !== 'global'
    ? Logger.colors.red
    : Logger.colors.green

  const globalData = gValue && globalLog(`  Global: ${key}=${gValue}\n`) || ''
  const localData = lValue && localLog(`  Local: ${key}=${lValue}\n`) || ''

  stats[type].push(`${ found }${ globalData }${ localData }`)
  
  return stats
}

/**
 * Loads the content of the current default.env
 * <br/>Then checks if all the keys have been added from keg-cli defaults.env file
 * @param {boolean} log - Should log message about syncing default.env file
 *
 * @returns {void}
 */
const updateDefaultEnvFile = async (params={}) => {
  const { merge=true, conflict='global', force, log } = params

  // Get the path to the global ENVs
  const globalEnvsPath = path.join(GLOBAL_CONFIG_FOLDER, '/', DEFAULT_ENV)

  // Load the contents of the current env file
  const [ err, globalEnvString ] = await readFile(globalEnvsPath)
  let globalEnvStr = globalEnvString

  // Load the contents of the Global ENV file
  const globalEnvs = await parseContent(
    globalEnvsPath,
    'utf8',
    false
  )

  // Load the local Keg-CLI defaults ENV file
  const localEnvs = parseContent(
    path.join(CLI_ROOT, 'scripts/setup/', DEFAULT_ENV),
    'utf8',
    false
  )

  const stats = { conflict: [], add: [] }

  // Loop the envs from the Keg-CLI, and add them to the defaults.env if they don't exist
  const envsToAdd = Object.keys(localEnvs)
    .reduce((envStr, key) => {

      // If not global ENV exists, then just add it
      if(!globalEnvs[key]){
        updateStats(stats, 'add', {
          key,
          conflict,
          lValue: localEnvs[key],
        })
        
        return `${envStr}${key}=${ localEnvs[key] }\n`
      }

      // If the ENV exists at both and is the same
      // Or the conflict argument is set to global, just return
      if(conflict === 'global' || localEnvs[key] === globalEnvs[key]) return envStr

      // At this point both ENV files have the value and there's a conflict
      // And the conflict param is not global 

      // If we get here, we want to override the global ENV value with the local
      // So comment out the current keg/value pair 
      const curENVStr = `${ key }=${ globalEnvs[key] }`
      const replace = new RegExp(`${curENVStr}`, 'g')

      globalEnvStr = globalEnvStr.replace(replace, `# ${curENVStr}`)

      updateStats(stats, 'conflict', {
        key,
        conflict,
        ...(localEnvs[key] && { lValue: localEnvs[key] }),
        ...(globalEnvs[key] && { gValue: globalEnvs[key] }),
      })

      // Add the new key value pair to the envStr being built and return
      return `${envStr}${key}=${ localEnvs[key] }\n`

    }, '')

  return saveENVFile({
    log,
    stats,
    force,
    conflict,
    envsToAdd,
    existingEnvs: globalEnvStr,
  })

}

module.exports = {
  updateDefaultEnvFile
}
