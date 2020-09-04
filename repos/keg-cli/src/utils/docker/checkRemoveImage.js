const { ask } = require('@keg-hub/ask-it')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { generalError } = require('../error/generalError')
const { getContainerConst } = require('../docker/getContainerConst')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Checks if a docker image exists, and if it does, then asks to remove it
 * @param {string} context - Context for the image
 * @param {string} tap - Name of the tap to build the image for
 * @param {string} message - Message to display when asking if image should be removed
 * @param {string} defImgName - Default image name to use when checking if the image exists
 *
 * @returns {void}
 */
const checkRemoveImage = async (context, tap, message, defImgName) => {
  const imageName = getContainerConst(context, `env.image`, defImgName)

  const exists = await docker.image.exists(imageName)
  
  // If the image does not exists, just return
  if(!exists) return true

  message = message || `Docker image ${imageName} already exists. Would you like to remove it`

  // If the image exists, ask if we should remove it
  const shouldRemove = await ask.confirm(message)
  !shouldRemove && checkCall(() => {
    Logger.highlight(
      `Can not execute task without removing the image`,
      `"${imageName}"`,
      `Exiting!`
    )
    process.exit(0)
  })

  const res = await docker.image.remove({ item: imageName, force: true })

  res && Logger.info(res)

}

module.exports = {
  checkRemoveImage
}
