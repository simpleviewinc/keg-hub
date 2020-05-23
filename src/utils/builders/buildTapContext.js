const { get } = require('jsutils')
const { generalError, throwNoTapLink } = require('../error')
const { CONTAINERS } = require('KegConst/docker/build')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')

/**
 * Checks if the context is tap, and gets the Tap path if needed
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} cmdContext - Context to run the docker container in
 * @param {string} tap - Name of the tap to execute task on
 * @param {Object} envs - Group envs passed to docker command being run
 * @param {Object} task - Current task being run
 *
 * @returns {Object} - ENVs for the context, with the CONTEXT_PATH added if needed
 */
const buildTapContext = ({ globalConfig, cmdContext, tap, envs }) => {
  // If the context is not a tap, or the CONTEXT_PATH is already set, just return
  if(cmdContext !== 'tap' || envs.CONTEXT_PATH) return envs

  // Should only get here if we are trying to run a tap in docker
  // So at this point tap should be the name of the linked tap to run
  // Ensure there is a tap to find the link for
  !tap && generalError(
    `The 'tap' argument is required when no 'context' argument exists or 'context' is set to 'tap' when running this task!`
  )

  const tapPath = getTapPath(globalConfig, tap)

  return !tapPath
    ? throwNoTapLink(globalConfig, tap)
    : {
        ...envs,
        CONTEXT_PATH: tapPath
        // May want to override the container name here
        // This way we can have more then one tap docker container running at a time
        // CONTAINER_NAME: tap
      }

}

module.exports = {
  buildTapContext
}