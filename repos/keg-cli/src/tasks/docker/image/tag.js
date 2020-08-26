const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { copyFileSync } = require('KegFileSys/fileSys')
const { throwRequired, generalError } = require('KegUtils/error')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

/**
 * Tag options for tag and remove tag tasks
 * @Object
 */
const tagOpts = {
  context: {
    alias: [ 'name' ],
    allowed: DOCKER.IMAGES,
    description: 'Context or name of the image to tag',
    example: 'keg docker image tag --context core',
    enforced: true,
  },
  log: {
    description: 'Log the docker tag command',
    example: 'keg docker image tag --log false',
    default: true
  },
  tag: {
    description: 'Tag to add to the image',
    example: 'keg docker image tag --tag my-tag',
    required: true
  },
}

/**
 * Run a docker image tag command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerTag = async args => {
  const { command, __internal={}, globalConfig, options, params, task, tasks } = args
  const { context, tag, remove, log } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { image } = __internal.containerContext
    ? __internal.containerContext
    : await buildContainerContext({ globalConfig, task, params })

  // If remove is passed, then call the removeTag method
  // Otherwise call the tag method
  const tagMethod = remove ? docker.image.removeTag : docker.image.tag

  // If we have an image, call the tag method, otherwise throw no image error
  image
    ? await tagMethod({ tag, item: image, log })
    : generalError(`Could not find image to tag for context "${ context }"`)

  log && Logger.info(`Finished updating docker image tags for "${ context }"`)
}

/**
 * Run a docker image remove tag command
 * Calls the dockerTag method, but injects remove: true into the params
 * @Object
 */
const removeTag = {
  remove: {
    name: 'remove',
    alias: [ 'rm', 'delete', 'del' ],
    description: 'Removes a tag from an image',
    options: tagOpts,
    action: args => dockerTag({ ...args, params: { ...args.params, remove: true }}),
  }
}

module.exports = {
  tag: {
    name: 'tag',
    alias: [ 't' ],
    action: dockerTag,
    description: `Runs docker image tag`,
    example: 'keg docker image tag <options>',
    tasks: {
      ...removeTag,
    },
    options: tagOpts,
  }
}
