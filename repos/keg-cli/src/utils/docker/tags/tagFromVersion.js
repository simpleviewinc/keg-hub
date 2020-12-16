const { get } = require('@keg-hub/jsutils')
const { getPackageVersionTag } = require('KegUtils/docker/tags/tagHelpers')

/**
 * Gets the version tag from the passed in option, the package.json or context
 * @type function
 * Formats found tags option into docker format
 * @param {Array} params - Options passed from the command line
 * @param {string} env - Current environment the command is being run in
 * @param {Object} args - Arguments passed to the task
 *
 * @returns {string} - Formatted string of tags for docker
 */
const tagFromVersion = async (params, args) => {
  const { containerContext } = args
  const { tagPackage, version, context, location } = params

  // If a version is explicitly defined, then add it to the tags array
  // Else if tagPackage is true, try to get the package.json version
  // Otherwise, use the version defined in the container constants if it exists
  return version ||
    tagPackage && await getPackageVersionTag({...args, params: { location }}) ||
    containerContext && get(containerContext, 'contextEnvs.VERSION')
}

module.exports = {
  tagFromVersion
}