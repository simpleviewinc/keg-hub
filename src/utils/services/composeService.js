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
  const { service, log } = params

  const composeRes = await runInternalTask('tasks.docker.tasks.compose.tasks.up', {
    ...args,
    command: 'up',
    params: {
      ...args.params,
      tap: tap || params.tap,
      context: context || params.context,
    },
  })

  // Run the mutagen service if needed
  return service === 'mutagen'
    ? mutagenService(args, composeRes)
    : composeRes

}

module.exports = {
  composeService
}