const { get } = require('@keg-hub/jsutils')
const { getFromImage } = require('./getFromImage')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Gets the base tag from the KEG_BASE_IMAGE env or the getFromImg helper
 * @function
 * @param {Object} params - Parsed command line options
 * @param {string} cmdContext - The current context of the task being run ( core, components, tap ... )
 * @param {string} fromImage - From Image for the current context
 *
 * @returns {string} - Found base image tag || default environment
 */
const getBaseTag = (params, cmdContext, fromImg) => {

  fromImg = fromImg || getFromImage(params, getContainerConst(cmdContext, 'env'), cmdContext)
  const fromTag = fromImg.includes(':') && fromImg.split(':')[1]

  return fromTag ||
    get(params, 'env') ||
    getSetting('defaultEnv')
}


module.exports = {
  getBaseTag
}