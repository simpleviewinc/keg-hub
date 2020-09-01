const { get } = require('@keg-hub/jsutils')
const docker = require('KegDocCli')

/**
 * Checks if a container matches the containerContext
 * @function
 * @param {Object} containerContext - Response from the buildContainerContext helper
 * @param {Object} container - JSON object from the docker CLI
 *
 * @returns {boolean} - T/F if a match is found
 */
const hasMatch = (containerContext, container) => (
  containerContext.image === container.image ||
    containerContext.withPrefix === container.name ||
    containerContext.context === container.name
)

/**
 * Loops over all returned containers checking for matches to the containerContext
 * <br/> Only adds the container info if only one container match if found
 * @function
 * @param {Object} containerContext - Response from the buildContainerContext helper
 * @param {Object} container - JSON object from the docker CLI
 *
 * @returns {Object} - containerContext with the container info added if found
 */
const searchContainers = (containerContext, containers) => {
  // Get all matching containers
  const matches = containers.filter(container => hasMatch(containerContext, container))

  // Only use the container, if there's only one matching container
  return matches.length === 1
    ? { ...matches[0], ...containerContext }
    : containerContext

}

/**
 * Tries to find a container based on the passed in container context
 * @function
 * @param {Object} containerContext - Response from the buildContainerContext helper
 *
 * @returns {Object} - containerContext with the container info added if found
 */
const getContainerFromContext = async (containerContext={}) => {
  const containers = await docker.container.list({ errResponse: [], format: 'json' })

  return !containers
    ? containerContext
    : searchContainers(containerContext, containers)

}

module.exports = {
  getContainerFromContext
}
