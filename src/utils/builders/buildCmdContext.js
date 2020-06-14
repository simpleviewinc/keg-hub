const { getTapPath } = require('../globalConfig/getTapPath')
const { generalError } = require('../error')
const { invoke } = require('../helpers/invoke')
const { PACKAGE } = require('KegConst/constants')

/**
 * Parse the context based on the passed in context value
 * <br/> Filters out `keg` and `tag` based on `:`
 * @function
 * @param {string} toParse - Context to parse
 *
 * @returns {Object} - ENVs for the context
 */
const parseContext = toParse => {
  if(!toParse) return {}

  // Check if it's a packaged context, and if so parse the context from it
  let { context, package } = toParse.indexOf(PACKAGE) !== 0
    ? { context: toParse }
    : invoke(() => {
        const [ _, context ] = toParse.split('-')
        return { context, package: toParse }
      })

  // Check if the context is prefixed with `keg`
  // If it is, remove it. This allows passing in "kegcore" or just "core"
  context = context.indexOf('keg') === 0
    ? context.replace(/^keg-/, '').replace(/^keg/, '')
    : context

  return { context, package }

}

/**
 * Gets the cmdContext for the task based on the passed in params
 * @function
 * @param {string} context - Context to run the docker container in
 *
 * @returns {Object} - ENVs for the context
 */
const buildCmdContext = ({ globalConfig, params, allowed, defContext }) => {
  const { tap } = params

  // Check if the context is prefixed with `keg`
  // If it is, remove it. This allows passing in "kegcore" or just "core"
  const { context, package } = parseContext(params.context)

  // If context is in the allowed, and it's not a tap, then just return the cmdContext
  if(allowed.indexOf(context) !== -1 && context !== 'tap' && !tap)
    return { cmdContext: context, package }

  // Check if the context or the tap, has a tap path
  // This allow passing the tap in as the context
  const hasTapPath = getTapPath(globalConfig, context) ||
    ( tap && getTapPath(globalConfig, tap) )

  // Get the context the command should be run in
  // If there is a tap path, then use the tap, else use the context || defContext
  const cmdContext = hasTapPath ? 'tap' : context || defContext

  // Ensure we have a valid context to run the command in
  ;(!cmdContext || (!allowed.includes(cmdContext) && !allowed.includes(params.context))) &&
    generalError(`The context "${ context }" is invalid. A valid "context" is required!`)

  return { cmdContext, package, tap: tap || context }
}


module.exports = {
  buildCmdContext
}