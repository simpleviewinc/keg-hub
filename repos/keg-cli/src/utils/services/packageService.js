const { get } = require('@keg-hub/jsutils')
const { proxyService } = require('./proxyService')
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
  const isRun = get(serviceArgs, `params.service`) === 'run'

  if(!isRun) return runInternalTask('docker.tasks.package', serviceArgs)

  // Call the proxy service to make sure that is running
  await proxyService(args)

  // Run the docker package task
  return runInternalTask('docker.tasks.package.tasks.run', serviceArgs)

}

module.exports = {
  packageService
}