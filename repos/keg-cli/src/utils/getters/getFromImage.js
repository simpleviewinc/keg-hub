const { get, isStr } = require('@keg-hub/jsutils')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')

/**
 * Gets the image to use as the KEG_FROM_IMAGE env based on params context envs, or the image name
 * @function
 * @param {Object} params - Parsed options passed in from the command line
 * @param {Object} contextEnvs - loaded ENVs based on the context
 * @param {string} context - The image or context to get the fromImage for
 *
 * @returns {string} - Found from image
 */
const getFromImage = (params, contextEnvs, context) => {
  const { pull, from, __injected={}, cmdContext, context:paramContext } = params
  context =  context || __injected.tap || cmdContext || paramContext

  return isStr(pull)
    ? pull
    : isStr(from)
      ? from
      : contextEnvs && get(contextEnvs, 'KEG_BASE_IMAGE') ||
        context && getContainerConst(context, `env.image`, context)

}

module.exports = {
  getFromImage
}
