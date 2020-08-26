const { executeCmd } = require('KegProc')
const { generalError } = require('KegUtils/error')
const { Logger } = require('KegLog')

/**
 * Attempts to kill the process identified by pid
 * @param {string} pid - process id
 */
const kill = async pid => {
  (!pid || pid <= 0) && generalError(`Kill() expects pid to be positive. Found: ${pid}`)
  
  const { error } = await executeCmd(
    `kill -9 ${pid}`,
    {} 
  )

  error
    ? generalError(error)
    : Logger.info('Process killed.')
}

module.exports = { kill }