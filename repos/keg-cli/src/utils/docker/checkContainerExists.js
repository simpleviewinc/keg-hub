const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { ask } = require('@keg-hub/ask-it')

/**
 * Checks if a docker container already exists
 * <br/>If it does, asks user if they want to remove it
 * @function
 * @param {string} container - Name of the container that already exists
 *
 * @returns {string} - Name of the current branch
 */
const checkContainerExists = async container => {
  const exists = await docker.container.get(container)
  if(!exists) return false
  
  Logger.empty()
  Logger.print(
    Logger.colors.brightYellow(`A docker container already exists with the name`),
    Logger.colors.cyan(`"${ container }"\n`),
    Logger.colors.brightRed(`Running container must be removed before this container can be run!`)
  )

  Logger.empty()
  const remove = await ask.confirm(`Would you like to remove it?`)
  Logger.empty()

  return remove
    ? await docker.container.destroy(container) && false
    : true

}

module.exports = {
  checkContainerExists
}