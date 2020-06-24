const { get } = require('jsutils')
const { mutagenService } = require('./mutagenService')
const { runInternalTask } = require('../task/runInternalTask')


/**
 * Runs `docker-compose` up command based on the passed in args
 * @function
 * @param {Object} args - Default task arguments passed from the runTask method
 * @param {Object} argsEXT - Extra arguments to run the service
 * @param {string} argsEXT.context - The context to run the `docker-compose` command in
 * @param {string} argsEXT.tap - Name of the tap to run the `docker-compose` command in
 *
 * @returns {*} - Response from the `docker-compose` up task
 */
const composeService = async (args, { context, tap }) => {
  const { params } = args

  const containerContext = await runInternalTask('tasks.docker.tasks.compose.tasks.up', {
    ...args,
    params: {
      ...params,
      tap: tap || params.tap,
      context: context || params.context,
    }
  })

  // Run the mutagen service if needed
  return get(args, 'params.service') === 'mutagen'
    ? mutagenService(args, { context, tap, containerContext })
    : containerContext

}

module.exports = {
  composeService
}