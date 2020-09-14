
/**
 * Root Keg-Proxy task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const proxyCmd = args => {
  const { command, options, tasks, globalConfig } = args
  console.log(`---------- proxyCmd ----------`)
  console.log(proxyCmd)
}

module.exports = {
  proxy: {
    name: 'proxy',
    alias: [ 'prx', 'px' ],
    tasks: {
      ...require('./attach'),
      ...require('./build'),
      ...require('./destroy'),
      ...require('./stop'),
      ...require('./start'),
    },
    action: proxyCmd,
    description: 'Keg Proxy specific tasks',
    example: 'keg proxy <command> <options>'
  }
}
