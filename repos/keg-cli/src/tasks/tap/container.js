const { Logger } = require('KegLog')
const { buildContainerContext } = require('KegUtils/builders')

/**
 * Start a tap with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const tapContainer = async (args) => {
  const { params, globalConfig, task } = args

  const containerContext = await buildContainerContext(args)
  Logger.info(`Tap Container Context:`)
  console.log(containerContext)


}
module.exports = {
  container: {
    name: 'container',
    alias: [ 'cont' ],
    inject: true,
    action: tapContainer,
    description: `Injects a tap container folder into the docker constants`,
    example: 'keg tap container <options>',
    options: {},
  }
}