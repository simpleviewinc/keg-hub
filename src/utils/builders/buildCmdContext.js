const { getTapPath } = require('../globalConfig/getTapPath')
const { generalError } = require('../error')

/**
 * Gets the cmdContext for the task based on the passed in params
 * @function
 * @param {string} context - Context to run the docker container in
 *
 * @returns {Object} - ENVs for the context
 */
const buildCmdContext = ({ globalConfig, params, allowed, defContext }) => {
  const { context, tap } = params

  // If context is in the allowed, and it's not a tap, then just return the cmdContext
  if(allowed.indexOf(context) !== -1 && context !== 'tap' && !tap)
    return { cmdContext: context }

  // Check if the context or the tap, has a tap path
  // This allow passing the tap in as the context
  const hasTapPath = getTapPath(globalConfig, context) ||
    ( tap && getTapPath(globalConfig, tap) )

  // Get the context the command should be run in
  // If there is a tap path, then use the tap, else use the context || defContext
  const cmdContext = hasTapPath ? 'tap' : context || defContext

  // Ensure we have a valid context to run the command in
  !cmdContext &&
    allowed.indexOf(cmdContext) === -1 &&
    generalError(`The 'context' argument is required to run this task!`)

  return { cmdContext, tap: tap || context }
}


module.exports = {
  buildCmdContext
}