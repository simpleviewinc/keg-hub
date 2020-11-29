const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')


/**
 * Gets the image pull policy from the containers ENV's or the global config
 * @function
 * @param {string} context - Context or name of the container to get the pull policy for
 *
 * @returns {string} - Pull policy
 */
const getImagePullPolicy = context => {
  return (getContainerConst(context, `'ENV.KEG_IMAGE_PULL_POLICY`, getSetting('docker.imagePullPolicy')) || '').toLowerCase()
}


module.exports = {
  getImagePullPolicy
}