const { ask } = require('@keg-hub/ask-it')
const { getProcessesUsingPort, printProcesses, kill } = require('KegUtils')
const { generalError } = require('KegUtils/error')

/**
 * Asks user to confirm that they want the processes killed
 * @param {string} port
 * @param {Array<Object>} processes - processes to confirm to kill
 * @returns {Promise<bool>} - user response (true if you should kill the processes)
 */
const confirmKill = async (port, processes=[]) => {
  printProcesses(`Processes using port ${port}:`, processes)
  return ask.confirm(`Kill ${processes.length} processes? [y/n]`)
}

/**
 * Utility for finding and terminating processes using a specified port
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const killProcessUsingPort = async args => {
  const { params } = args
  const { port, force } = params

  const processes = await getProcessesUsingPort(port)
  ;(processes.length === 0) && generalError(`No processes are using port ${port}`)

  const shouldKill = force || await confirmKill(port, processes)
  shouldKill && processes.map(proc => kill(proc.pid))
}

module.exports = {
  'kill': {
    name: 'kill',
    alias: [ 'k' ],
    action: killProcessUsingPort,
    description: `Utility for finding and terminating processes using a specified port`,
    example: 'keg net kill 5901',
    options: {
      port: {
        alias: ['p'],
        description: 'The port the process is using',
        example: 'keg net kill --port 5901',
        required: true
      },
      force: {
        alias: [ 'y', 'f' ],
        description: 'Bypass the confirmation prompt before killing any processes',
        example: 'keg net kill --port 5901 --force',
      }
    }
  }
}