const docker = require('KegDocCli')
const { get, isFunc } = require('@keg-hub/jsutils')
const { generalError } = require('KegUtils/error')

/**
 * Builds the context for call docker cli commands
 * @function
 * @param {Object} - args - Response from the buildContainerContext helper
 * @param {string} image - Name of the image to be used
 * @param {Object} contextEnvs - ENVs to be added when making the docker cli call
 * @param {string}  - Path where the docker cli command should be run from
 *
 * @returns {Object} - Response from the docker cli
 */
const buildDocContextCmd = ({ image, contextEnvs, location }) => {
  return (method, args) => {
    const strCmd = isStr(args)

    args = strCmd && { cmd: args } || args
    const { item, container, image:imgRef } = args
    const docRef = item || container || imgRef || image

    docMethod = get(docker, method)
    return !isFunc(docMethod)
      ? generalError(`Docker CLI method "${method}" does not exist!`)
      : docMethod(
          strCmd ? cmd : { ...args, item: docRef },
          { options: { env: contextEnvs } },
          location
        )
  }
}

module.exports = {
  buildDocContextCmd
}