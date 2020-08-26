const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { throwRequired, generalError } = require('KegUtils/error')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

/**
 * Creates an image from a docker container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const containerCommit = async args => {
  const { globalConfig, params, task } = args
  const { context, message, author, log } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, id, name } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  const containerRef = id || name
  const res = containerRef
    ? await docker.container.commit({
        author,
        message,
        container: containerRef,
      })
    : Logger.warn(`Can not find container for "${ tap || cmdContext }"!`)

  // Log the output of the command
  log && Logger.highlight(`Docker`, `"commit"`, `${ cmdContext } complete!`)

}

module.exports = {
  commit: {
    name: 'commit',
    alias: [ 'com' ],
    action: containerCommit,
    description: `Creates an image from a docker container`,
    example: 'keg docker container commit <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      author: {
        description: `The author of the new docker image`,
        example: `keg docker container commit --author "John Doe"`,
      },
      log: {
        description: 'Log the commit command to the terminal',
        example: 'keg docker container commit --log false',
        default: true,
      },
      message: {
        description: `Apply a commit message to the docker image`,
        example: `keg docker container commit --message "My Image"`,
      }
    },
  }
}
