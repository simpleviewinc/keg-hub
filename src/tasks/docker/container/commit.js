const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { DOCKER } = require('KegConst/docker')
const docker = require('KegDocCli')

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
  const { context, message, author } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && generalError(
    `Tap location could not be found for ${ tap }!`,
    `Please ensure the tap path is linked in the global config!`
  )

  const res = await docker.container.commit({
    author,
    message,
    container: cmdContext,
  })

  // Log the output of the command
  dockerLog(res)

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
      message: {
        description: `Apply a commit message to the docker image`,
        example: `keg docker container commit --message "My Image"`,
      }
    },
  }
}
