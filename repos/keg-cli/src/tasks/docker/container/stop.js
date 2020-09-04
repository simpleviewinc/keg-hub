const { get } = require('@keg-hub/jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig')
const { spawnCmd } = require('KegProc')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')

/**
 * Run a docker container command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const containerStop = async args => {
  const { globalConfig, params, task } = args
  const { context, log, tap } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { id, name, image, cmdContext } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  const containerRef = id || name
  containerRef
    ? await docker.container.stop({
      log,
      item: containerRef,
      force: true,
    })
    : Logger.warn(`Can not find container for "${ tap || cmdContext }"!`)

  // Log the output of the command
  log && Logger.highlight(`Docker`, `"stop"`, `${ cmdContext } complete!`)

}

module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'stp', 'halt', 'hlt' ],
    action: containerStop,
    description: `Removes all stopped docker containers`,
    example: 'keg docker container clean <options>',
    options: {
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker container commit --log false',
        default: true,
      },
    }
  }
}
