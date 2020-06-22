const { reduceObj } = require('jsutils')
const { generalError } = require('../error/generalError')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getContext } = require('KegUtils/getters/getContext')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Gets the cmdContext for the task based on the passed in params
 * @function
 * @param {string} context - Context to run the docker container in
 *
 * @returns {Object} - ENVs for the context
 */
const buildCmdContext = ({ globalConfig, params, allowed }) => {
  const { tap, container } = params

  // Check if the context is prefixed with `keg`
  // If it is, remove it. This allows passing in "kegcore" or just "core"
  const contextData = getContext(params)
  const { context } = contextData

  // If context is in the allowed, and it's not a tap, then just return the cmdContext
  if(allowed.indexOf(context) !== -1 && context !== 'tap' && !tap && !container)
    return { ...contextData, cmdContext: context, tap: context }

  // Check if the context or the tap, has a tap path
  // This allow passing the tap in as the context
  const hasTapPath = getTapPath(globalConfig, context) ||
    ( tap && getTapPath(globalConfig, tap) )

  // Get the context the command should be run in
  // If there is a tap path, then use the tap, else use the context || defContext
  const cmdContext = hasTapPath ? 'tap' : context

  // Ensure we have a valid context to run the command in
  ;(!cmdContext || (!allowed.includes(cmdContext) && !allowed.includes(params.context))) &&
    generalError(`The context "${ context }" is invalid. A valid "context" is required!`)

  return { ...contextData, cmdContext, tap: tap || context }
}


module.exports = {
  buildCmdContext
}