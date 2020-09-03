const path = require('path')
const pkg = require('KegPackage')
const { spawnProc } = require('KegProc')
const CONSTANTS = require('KegConst/constants')
const { stat, requireFile } = require('KegFileSys')
const { get, isStr, isFunc } = require('@keg-hub/jsutils')
const { CLI_ROOT } = require('KegConst/constants')
const { generalError } = require('KegUtils/error')

const updateCliError = (message, error) => {
  message = message || `Error running Keg-CLI update!\n`

  !error
    ? generalError(message)
    : generalError(message, error ? error.stack : undefined)
}

const runCmd = async cmd => {
  const { error, data } = await spawnProc(cmd, { cwd: CLI_ROOT })
  error && updateCliError(`Error while running Keg-CLI update script ${ script }\n`, error)

}

const doesScriptExist = async (scriptPath, ext='sh') => {
  const [ _, exists ] = await stat(`${scriptPath}.${ext}`)

  return exists
}

const checkRunBashScript = async version => {
  const updateScript = path.join(CLI_ROOT, `scripts/cli/updates/${version}`)
  const scriptExists = await doesScriptExist(updateScript, 'sh')

  scriptExists && await runCmd(`/bin/bash ${ updateScript }.sh`)
}

const checkRunNodeScript = async version => {

  const scriptPath = path.join(CLI_ROOT, `scripts/cli/updates`)
  const scriptExists = await doesScriptExist(`${ scriptPath }/${version}`, 'js')
  if(!scriptExists) return

  const { data, location } = requireFile(scriptPath, `${version}.js`)
  
  return isFunc(data)
    ? data()
    : !location && updateCliError(`Error running script ${ updateScript }.js\n`)

} 

/**
 * Updates the Keg-CLI to the latest version
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const updateCLI = async args => {
  const { globalConfig, options, params, tasks } = args

  // Get the version to run the update for
  // Default pull from the package.json version field
  const version = params.version || pkg.version

  // If no version found, then throw
  !version && updateCliError(`Could not find Keg-CLI version!`)

  // Check and run any bash scripts that exist
  await checkRunBashScript(version)

  // Check and run any node scripts that exist
  await checkRunNodeScript(version)

}

module.exports = {
  update: {
    name: 'update',
    alias: [ 'udp' ],
    action: updateCLI,
    description: `Updates the Keg-CLI to the latest version`,
    example: 'keg cli update',
    options: {
      version: {
        description: 'Version of Keg-CLI update script to run. Default is package.json version',
        example: 'keg cli update --version 1.2.0',
      }
    }
  }
}
