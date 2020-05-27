const { camelCase, snakeCase, isArr, isFunc, isStr, toStr } = require('jsutils')
const { executeCmd } = require('KegProc')
const { Logger } = require('KegLog')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')


const noItemError = (cmd, shouldThrow=false) => {
  Logger.empty()
  Logger.error(`Docker API command Failed`)
  Logger.info(`The "${ cmd }" command requires an object argument with an item key to run!`)
  Logger.empty()

  if(!shouldThrow) return false
  
  throw new Error(`Docker API command Failed!`)
}

const cmdSuccess = (cmd, message) => {
  Logger.empty()
  Logger.success(message || `Docker ${cmd} command succeeded!`)
  Logger.empty()

  return true
}

/**
 * Error logger for docker commands. Logs the passed in error, then exits
 * @param {string} error - The error to be logged
 * @param {*} errResponse - Response to return after logging the error.
 *                          Exists the process it errResponse is falsy
 *
 * @returns {*} - Passed in errResponse
 */
const apiError = (error, errResponse, skipError) => {

  // Check if we should skip logging the error
  if(skipError) return errResponse

  const toLog = isStr(error)
    ? error
    : isObj(error) && error.stack
      ? error.stack
      : toStr(error)

  Logger.empty()
  Logger.error(`  Docker Api Error:`)
  Logger.error(` `, toLog.split(NEWLINES_MATCH).join('\n  '))
  Logger.empty()


  // If the errResponse is not undefined, return it... otherwise exit the process!
  return errResponse !== undefined  ? errResponse : process.exit(1)
}

/**
 * Formats the docker cli response into an array of items
 * @function
 * @param {string} data - response data from the docker CLI
 *
 * @returns {Array} - JSON array of items
 */
const itemHeaderMap = (data, format) => {
  
  if(format === 'json'){
    return data.split('\n')
      .reduce((items, item) => {
        if(!item.trim()) return items

        try {
          const parsed = JSON.parse(item.replace(/\\"/g, ''))
          const built = {}
          Object.keys(parsed).map(key => built[camelCase(snakeCase(key))] = parsed[key])
          return items.concat([ built ])
        }
        catch(e){
          return items
        }

      }, [])
  }

  const lines = data.toLowerCase().split(NEWLINES_MATCH)
  const headers = lines.shift().split(SPACE_MATCH)

  return lines.reduce((mapped, line) => {
    return !line.trim()
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

  }, [])

}

/**
 * Compares the passed in item's keys with the compare argument
 * @function
 * @param {Object} item - Item to compare
 * @param {string} compare - Value to compare each item with
 * @param {string|function} doCompare - How to compare each container
 * @param {Array} defCompareKeys - If no doCompare is passed, use the default keys for compare
 *
 * @returns {Boolean} - If the compare values match
 */
const compareItems = (item, compare, doCompare, defCompareKeys=[]) => {
  return isStr(doCompare)
    ? item[doCompare] === compare
    : isFunc(doCompare)
      ? doCompare(item, compare)
      : defCompareKeys.some(key => item[key] === compare)
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
const dockerCmd = async ({ opts, asStr, errResponse, skipError, format='', force }) => {
  const options = isArr(opts) ? opts.join(' ').trim() : toStr(opts)
  const useFormat = format === 'json' ? `--format "{{json . }}"` : format
  const useForce = force ? '--force' : ''

  const cmdToRun = `docker ${ options } ${ useForce } ${ useFormat }`.trim()

  Logger.empty()
  Logger.message(`Running command: `, cmdToRun)

  const { error, data } = await executeCmd(cmdToRun)

  return error
    ? apiError(error, errResponse, skipError)
    : asStr
      ? data
      : itemHeaderMap(data, format)
}


module.exports = {
  apiError,
  compareItems,
  cmdSuccess,
  dockerCmd,
  noItemError,
}
