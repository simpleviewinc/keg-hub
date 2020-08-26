const { Logger } = require('KegLog')
const { cliError, cliSuccess } = require('./helpers')
const { executeCmd, spawnCmd, spawnProc } = require('KegProc')

/**
 * Calls the gh cli from the command line and returns the response
 * @function
 * @param {Object} args - arguments used to build the gh cli
 *
 * @returns {Array|string} - JSON array of items || stdout from docker cli call
 */
const ghCli = async ({ cmd, opts, log }) => {

  opts = isArr(opts) ? opts.join(' ') : opts

  const cmdToRun = `gh ${ cmd } ${ opts }`.trim()

  log && Logger.spacedMsg(`  Running command: `, cmdToRun)

  const { error, data } = await executeCmd(cmdToRun, cmdOpts)

  return error
    ? cliError(error, errResponse, skipError)
    : cliSuccess(data, format)

}

module.exports = {
  ghCli
}