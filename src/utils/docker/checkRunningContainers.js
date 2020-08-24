const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { get, reduceObj } = require('@svkeg/jsutils')
const { runInternalTask } = require('../task/runInternalTask')
const { getContext } = require('../getters/getContext')
const { generalError } = require('../error/generalError')

/**
 * Gets all container names of containers managed by the Keg-CLI
 * @function
 *
 * @returns {Array} - Array of container names from CONTAINER_NAME of the values files
 */
const getKegContainers = () => {
  return reduceObj(DOCKER.CONTAINERS, (keg, value, names) => {
    const contName = get(value, `ENV.CONTAINER_NAME`)

    return contName
      ? names.concat([ contName ])
      : names

  }, [])
}

/**
 * Gets all containers matching the Keg-CLI container names
 * @function
 * @param {Array} names - Names of containers managed by the Keg-CLI
 *
 * @returns {Array|false} - Array of running container matching Keg-CLI containers
 */
const getRunningMatches = async (names, filter=[]) => {

  // Get a list of all running containers
  const containers = await docker.container.ps()

  // If no containers, then nothing is running
  if(!containers || !containers.length) return false

  // Loop the containers and check if any match the names list
  return containers.reduce(async (toResolve, container) => {
    
      matches = await toResolve

      const contextData = await getContext({ context: container.name })
      const { context, noPrefix } = contextData
      
      return !filter.includes(container.name) && !filter.includes(context)
        ? names.includes(context) || names.includes(noPrefix)
          ? matches.concat([ { ...container, ...contextData } ])
          : matches
        : matches

    }, Promise.resolve([]))
}

/**
 * Checks if any running containers match containers within the Keg
 * @function
 *
 * @returns {Array|false} - Running containers that are managed by the Keg-CLI
 */
const checkRunningContainers = async (filter=[]) => {

  // Get all containers names managed by the Keg-CLI
  const containerNames = getKegContainers()

  // Check that we have container names to validate
  !containerNames.length &&
    generalError(`No Container value.yml files contain the "CONTAINER_NAME" env`)

  const runningMatches = await getRunningMatches(containerNames, filter)

  // Return any matching running containers || or false if there's no match
  return runningMatches && runningMatches.length
    ? runningMatches
    : false

}

module.exports = {
  checkRunningContainers
}

