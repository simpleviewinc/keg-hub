const { get } = require('jsutils')
const { generalError, throwNoTapLink } = require('../error')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { spawnCmd, executeCmd } = require('KegProc')
const { NEWLINES_MATCH, SPACE_MATCH } = require('KegConst/patterns')
const { getRemoteUrl } = require('KegLibs/git/getRemoteUrl')

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
const buildTapContext = async ({ globalConfig, cmdContext, tap, envs }) => {
  // If the context is not a tap, or the CONTEXT_PATH is already set, just return
  if(cmdContext !== 'tap') return envs

  // Should only get here if we are trying to run a tap in docker
  // So at this point tap should be the name of the linked tap to run
  // Ensure there is a tap to find the link for
  !tap && generalError(
    `The 'tap' argument is required when no 'context' argument exists or 'context' is set to 'tap' when running this task!`
  )

  const tapPath = getTapPath(globalConfig, tap)
  const tapUrl = tapPath && await getRemoteUrl(tapPath)

  return !tapPath
    ? throwNoTapLink(globalConfig, tap)
    : {
        ...envs,
        CONTEXT_PATH: tapPath,
        ...(tapUrl && { GIT_TAP_URL: tapUrl }),
        // May want to override the container name here
        // This way we can have more then one tap docker container running at a time
        // CONTAINER_NAME: tap
      }

}

module.exports = {
  buildTapContext
}