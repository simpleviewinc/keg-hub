const { get, isStr } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { generalError } = require('KegUtils/error')
const { exists } = require('KegUtils/helpers/exists')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { CONTAINERS } = require('KegConst/docker/containers')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { buildCmdContext } = require('KegUtils/builders/buildCmdContext')
/**
 * Run a docker image command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const removeDockerImage = async args => {

  const { globalConfig, params, __internal={} } = args
  const { context, tag } = params

  ;(!params.tag && !params.context) && generalError(
    `The docker "image remove" requires a context, name or tag argument!`
  )

  // Get the image name from the context, or use the passed in context
  const imgRef = context &&
    get(CONTAINERS, `${context && context.toUpperCase()}.ENV.IMAGE`) || context

  // Get the image meta data
  const image = tag
    ? await docker.image.getByTag(tag)
    : await buildCmdContext({
        params: { image: imgRef },
        askFor: false,
        globalConfig,
      })

  // Ensure we have the image meta data, and try to remove by imageId
  // __internal.skipThrow is an internal argument, so it's not documented
  if(!image || !image.id)
    return __internal.skipThrow !== true &&
      generalError(`The docker image "${ imgRef }" does not exist!`)

  const force = exists(params.force) ? params.force : getSetting(`docker.force`)
  const res = await docker.image.remove({ item: image.id, force })
  dockerLog(res, 'image remove')

  return image

}

module.exports = {
  remove: {
    name: 'remove',
    alias: [ 'rm', 'rmi' ],
    action: removeDockerImage,
    description: `Remove docker image by name`,
    example: 'keg docker image remove <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Name of the image to remove',
        example: 'keg docker image remove --name core',
      },
      tag: {
        description: 'Tag name of the image to remove',
        example: 'keg docker image remove --tag <tag name>',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image remove --force ',
      },
    },
  }
}
