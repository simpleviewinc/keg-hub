const { isArr, isStr, toStr, isObj } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { executeCmd, spawnCmd, spawnProc } = require('KegProc')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')

/**
 * Calls the git cli from the command line and returns the response
 * @function
 * @param {string} cmd - git command to be run
 *
 * @returns {string} - cmd with git added
 */
const ensureGit = cmd => (
  isStr(cmd)
    ? cmd.trim().indexOf('git') === 0
      ? cmd
      : `git ${cmd}`
    : isArr(cmd)
      ? cmd[0] === 'git'
        ? ensureGit(cmd.join(' '))
        : ensureGit((['git']).concat(cmd).join(' '))
      : cmd
)

/**
 * Ensures git is added to the passed in cmd, and executes the command
 * @function
 * @param {string} cmd - Git command to be run
 *
 * @returns {string} - Response from the git cli command
 */
const gitCmd = (cmd, cmdOpts, log) => spawnCmd(ensureGit(cmd), cmdOpts, log)

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
const gitCli = async (args={}, cmdOpts={}, location) => {
  const { opts, log, force, skipError } = args

  const options = isArr(opts) ? opts.join(' ').trim() : toStr(opts)
  const useForce = force ? '--force' : ''
  const cmdToRun = ensureGit(`${ options } ${ useForce }`.trim())
  log && Logger.spacedMsg(`Running command: `, cmdToRun)

  const { error, data } = await executeCmd(cmdToRun, cmdOpts, location)

  return error ? cliError(error, skipError) : data

}

/**
 * Runs a raw terminal command by spawning a child process
 * <br/> Auto adds git to the front of the cmd if it does not exist
 * @function
 * @param {string} cmd - Git command to be run
 * @param {string} args - Arguments to pass to the child process
 * @param {string} loc - Location where the cmd should be run
 * @param {boolean} log - Should log the output
 *
 * @returns {*} - Response from the git cli command
 */
const raw = async (cmd, args={}, loc=process.cwd(), log) => {

  // Build the command to be run
  // Add git if needed
  const toRun = ensureGit(cmd)

  // Run the git command
  const { error, data } = await spawnProc(toRun, args, loc)

  error && !data
    ? cliError(error)
    : log && Logger.success(`Finished running Git CLI command!`)
  
  return data
}

/**
 * Error handler for error in the Git CLI
 * @function
 * @param {string|Object} error - Error that was thrown
 * @param {boolean} skip - Should error logs be skipped
 *
 * @returns {void}
 */
const cliError = (error, skip=false) => {
  if(skip) return

  const toLog = isStr(error)
    ? error
    : isObj(error) && error.stack
      ? error.stack
      : toStr(error)

  Logger.empty()
  Logger.error(`Git CLI Error:`)
  Logger.error(toLog.split(NEWLINES_MATCH).join('\n  '))
  Logger.empty()

}

module.exports = {
  gitCli,
  gitCmd,
  raw,
}
