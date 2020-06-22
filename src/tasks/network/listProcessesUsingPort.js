const { Logger } = require('KegLog')
const { getProcessesUsingPort, printProcesses } = require('KegUtils')

/**
 * Utility for listing terminating using a specified port
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const list = async args => {
  const { params } = args
  const { port } = params

  const processes = await getProcessesUsingPort(port)

  return processes.length === 0
    ? Logger.info(`No processes are using port ${port}`)
    : printProcesses(`Processes using port ${port}:`, processes)
}

module.exports = {
  'listProcessesUsingPort': {
    name: 'list',
    alias: [ 'ls', 'l', ],
    action: list,
    description: `Utility for listing processes using a specified port`,
    example: 'keg net list 5901',
    options: {
      port: {
        alias: ['p'],
        description: 'The port to search by',
        example: 'keg net list --port 5901',
        required: true,
      },
    }
  }
}