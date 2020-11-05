const { isBool } = require('@keg-hub/jsutils')

/**
 * Gets the arguments to pass to the docker exec command
 * @function
 * @param {Boolean} serviceArgs.detach - Should the action run in detached mode
 * @param {Object} action - Sync action to run
 *
 * @returns {Array} - Array of Promises of each sync action
 */
const buildExecParams = ({ detach }, action={}) => {
  const { workdir, location, ...actionParams } = action
  const detachMode = isBool(detach) ? detach : actionParams.detach

  return {
    privileged: true,
    ...actionParams,
    detach: detachMode,
    options: detachMode ? '' : '-it',
    ...((workdir || location) && { workdir: workdir || location }),
  }

}

module.exports = {
  buildExecParams
}
