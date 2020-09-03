const { Logger } = require('KegLog')
const { pickKeys } = require('@keg-hub/jsutils')

/**
 * Prints out processes returned by getProcessesUsingPort
 * @param {string} title - title of table
 * @param {Array<Object>} processes - process objects
 * @example
 * const processes = getProcessesUsingPort(4000)
 * printProcesses('Processes:', processes)
 * @returns {void}
 */
const printProcesses = (title, processes=[]) => {
  Logger.info(title)
  const procStrings = processes.map(
    proc => pickKeys(proc, ['pid', 'port', 'command', 'owner', 'protocol'])
  )
  Logger.table(procStrings)
}

module.exports = { printProcesses }