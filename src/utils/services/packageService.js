const { get } = require('@ltipton/jsutils')
const { getServiceArgs } = require('./getServiceArgs')
const { runInternalTask } = require('../task/runInternalTask')

/**
 * Creates a docker package for the passed in arguments
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} argsExt - Arguments to override the passed in params
 *
 * @returns {*} - Response from the docker package task
 */
const packageService = async (args, argsExt) => {
  // Build the service arguments
  const serviceArgs = getServiceArgs(args, argsExt)

  // Run the docker package task
  return get(serviceArgs, `params.service`) === 'run'
    ? runInternalTask('docker.tasks.package.tasks.run', serviceArgs)
    : runInternalTask('docker.tasks.package', serviceArgs)

}

module.exports = {
  packageService
}