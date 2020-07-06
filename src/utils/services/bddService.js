const { get } = require('@ltipton/jsutils')
const { mutagenService } = require('./mutagenService')
const { runInternalTask } = require('../task/runInternalTask')
const { Logger } = require('KegLog')
const { composeService } = require('./composeService')

/**
 * Starts keg-regulator with docker-compose
 * <br/>Creates mutagen syncs of the features and steps folder based on the context || tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const bddService = async args => {

  // Clean up any old syncs no longer running
  await runInternalTask('mutagen.tasks.clean', args)

  const composeContext = await composeService(args, { context: 'regulator', container: 'keg-regulator' })


  console.log(`---------- bdd service ----------`)

}


module.exports = {
  bddService
}