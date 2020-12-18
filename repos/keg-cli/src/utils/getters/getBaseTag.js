const { getFromImage } = require('./getFromImage')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Gets the base tag from the KEG_BASE_IMAGE env or the getFromImg helper
 * @function
 * @param {Object} params - Parsed command line options
 * @param {string} cmdContext - The current context of the task being run ( core, components, tap ... )
 *
 * @returns {string} - Found base image tag
 */
const getBaseTag = (params, cmdContext) => {
  const baseFromImg = getContainerConst(cmdContext, `env.keg_base_image`)
  const baseFromTag = baseFromImg && baseFromImg.includes(':') && baseFromImg.split(':')[1]
  if(baseFromTag) return baseFromTag

  const fromImg = getFromImage(params, getContainerConst(cmdContext, 'env'), cmdContext)
  const fromTag = fromImg.includes(':') && fromImg.split(':')[1]

  return fromTag || get(params, 'env') || getSetting('defaultEnv')
}


module.exports = {
  getBaseTag
}