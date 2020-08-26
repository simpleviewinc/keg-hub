const { executeCmd } = require('KegProc')

/**
 * Parses the lsof string to return an object representing a process using a port
 * @param {string} lsofString - string from the lsof command
 * @returns {object} - process
 */
const parseProcess = (lsofString='') => {
  if (!lsofString) return null 

  const split = lsofString.split(/\s+/)

  const [
    command,
    pid,
    owner,
    fileDescriptor, 
    ipProtocol,
    _,
    __,
    connectionProtocol, 
    portStr,
  ] = split


  const portSplit = portStr.split(':')
  const port = portSplit[1] || portSplit[0]

  return {
    port,
    command,
    pid,
    owner,
    fileDescriptor,
    fd: fileDescriptor,
    protocol: {
      ip: ipProtocol,
      connection: connectionProtocol
    }
  }
}

/**
 * Returns an array of process objects (@see parseProcess for the schema) using the specified port
 * @param {string} port - port the processes are using
 */
const getProcessesUsingPort = async port => {
  const { error, data, exitCode } = await executeCmd(
    `lsof -nP -iTCP:${port} | grep LISTEN`,
    {}
  )

  return (error || exitCode) 
    ? []
    : data
        .split('\n')
        .map(parseProcess)
        .filter(p => p)
}

module.exports = { getProcessesUsingPort }

