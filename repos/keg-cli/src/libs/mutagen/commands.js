const { isArr, isStr, toStr, isObj } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { executeCmd, spawnCmd, spawnProc } = require('KegProc')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')
const { cliError, cliSuccess } = require('./helpers')

/**
 * Calls the git cli from the command line and returns the response
 * @function
 * @param {string} cmd - git command to be run
 *
 * @returns {string} - cmd with git added
 */
const ensureMutagen = cmd => cmd.trim().indexOf('mutagen') === 0 ? cmd : `mutagen ${cmd}`


/**
 * Calls the git cli from the command line and returns the response
 * @function
 * @param {Object} args - arguments used to modify the git api call
 * @param {Object} args.opts - optional arguments to pass to the git command
 * @param {Object} args.asObj - Return the response as an unformatted string
 * @param {Object} args.log - Log the git command being run before running it
 * @param {Object} args.skipError - Skip showing an error if the git command fails
 * @param {Object} [args.format=''] - Format the output of the git command
 * @param {Object} args.force - Pass "--force" to the git command, to force the operation
 * @param {Object} args.errResponse - On an error calling git, this will be returned.
 *                                      If errResponse is undefined, the current process will exit
 *
 * @returns {Array|string} - JSON array of items || stdout from git cli call
 */
const mutagenCli = async (args={}, cmdOpts={}, location) => {
  const { format, log, opts, skipError, isList } = args

  const options = isArr(opts) ? opts.join(' ').trim() : toStr(opts)
  const cmdToRun = ensureMutagen(`${ options }`.trim())
  log && Logger.spacedMsg(`  Running command: `, cmdToRun)

  const { error, data } = await executeCmd(cmdToRun, cmdOpts, location)

  return error ? cliError(error, skipError) : cliSuccess(data, format, skipError, isList)

}

/**
 * Runs a raw terminal command by spawning a child process
 * <br/> Auto adds mutagen to the front of the cmd if it does not exist
 * @function
 * @param {string} cmd - mutagen command to be run
 * @param {string} args - Arguments to pass to the child process
 * @param {string} loc - Location where the cmd should be run
 * @param {boolean} log - Should log the output
 *
 * @returns {*} - Response from the git cli command
 */
const raw = async (cmd, args={}, loc=process.cwd(), log) => {

  // Build the command to be run
  // Add git if needed
  const toRun = ensureMutagen(cmd)

  // Run the git command
  const { error, data } = await spawnProc(toRun, args, loc)

  error && !data
    ? cliError(error)
    : log && Logger.success(`  Finished running Mutagen CLI command!`)
  
  return data
}


module.exports = {
  mutagenCli,
  raw,
}