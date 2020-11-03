const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { ask } = require('@keg-hub/ask-it')
const { stopService } = require('KegUtils/services/stopService')

/**
 * Checks if a docker container already exists
 * <br/>If it does, asks user if they want to remove it
 * @function
 * @param {string} container - Name of the container that already exists
 *
 * @returns {string} - Name of the current branch
 */
const checkContainerExists = async (containerRef, context, args) => {
  const exists = await docker.container.get(containerRef)
  if(!exists) return false

  Logger.empty()
  Logger.log(
    Logger.colors.brightYellow(`A docker container already exists with the same name or domain:`),
    Logger.colors.cyan(`"${containerRef}"`),
    Logger.colors.brightRed(`\nThe existing container must be stopped before this container can be started!`)
  )

  Logger.empty()
  const remove = await ask.confirm(`Would you like to stop it?`)
  Logger.empty()

  if(!remove) return exists.name
 
  await stopService({ ...args }, { context: context, container: containerRef })

  return false
}

module.exports = {
  checkContainerExists
}
