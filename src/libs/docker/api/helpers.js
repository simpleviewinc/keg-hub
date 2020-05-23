const { isArr, toStr, isStr, camelCase } = require('jsutils')
const { executeCmd } = require('KegProc')
const { Logger } = require('KegLog')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')

/**
 * Error logger for docker commands. Logs the passed in error, then exits
 * @param {string} error - The error to be logged
 * @param {*} errResponse - Response to return after logging the error.
 *                          Exists the process it errResponse is falsy
 *
 * @returns {*} - Passed in errResponse
 */
const apiError = (error, errResponse) => {
  const toLog = isStr(error)
    ? error
    : isObj(error) && error.stack
      ? error.stack
      : toStr(error)

  Logger.empty()
  Logger.error(`  Docker Api Error:`)
  Logger.error(` `, toLog.split(NEWLINES_MATCH).join('\n  '))
  Logger.empty()

  return errResponse !== undefined ? errResponse : process.exit(1)
}

/**
 * Formats the docker cli response into an array of items
 * @function
 * @param {string} data - response data from the docker CLI
 *
 * @returns {Array} - JSON array of items
 */
const itemHeaderMap = data => {
  const lines = data.toLowerCase().split(NEWLINES_MATCH)
  const headers = lines.shift().split(SPACE_MATCH)

  return lines.reduce((mapped, line) => (
    !line.trim()
      ? mapped
      : mapped.concat([
          line
            .split(SPACE_MATCH)
            .reduce((item, content, index) => {
              const key = headers[index]
              item[camelCase(key)] = content
              return item
            }, {})
        ])
  ), [])

}

/**
 * Calls the docker cli from the command line and returns the response
 * @function
 * @param {Object} params - arguments used to modify the docker api call
 * @param {Object} params.opts - optional arguments to pass to the docker command
 * @param {Object} params.asStr - Return the response as an unformatted string
 * @param {Object} params.errResponse - On an error calling docker, this will be returned.
 *                                      If errResponse is undefined, the current process will exit
 *
 * @returns {Array|string} - JSON array of items || stdout from docker cli call
 */
const dockerCmd = async ({ opts, asStr, errResponse }) => {
  const { error, data } = await executeCmd(
    `docker ${ isArr(opts) ? opts.join(' ') : toStr(opts) }`.trim()
  )

  return error
    ? apiError(error, errResponse)
    : asStr
      ? data
      : itemHeaderMap(data)
}


module.exports = {
  dockerCmd
}
