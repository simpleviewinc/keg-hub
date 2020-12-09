const { get } = require('@keg-hub/jsutils')
const { runInternalTask } = require('../task/runInternalTask')
const { checkAddLatestTag } = require('../helpers/checkAddLatestTag')

/**
 * Calls the internal task to build the image for the passed in context
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} context - Image context that should be built
 * @param {Object} tap - Name of the tap to build in 'context' value is 'tap'
 *
 * @returns {void}
 */
const buildDockerImage = async (args, context, tap) => {
  const builtImage = await runInternalTask(`tasks.docker.tasks.build`, {
    ...args,
    params: { ...args.params, context, tap },
  })

  return checkAddLatestTag(builtImage, get(args, '__internal.addLatestTag') === true)
}

module.exports = {
  buildDockerImage
}