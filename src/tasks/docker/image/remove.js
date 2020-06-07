const { get } = require('jsutils')
const { generalError } = require('KegUtils/error')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { exists } = require('KegUtils/helpers/exists')

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

  const { params, __skipThrow } = args
  const { context, tag } = params
  const force = exists(params.force) ? params.force : getSetting(`docker.force`)

  // Ensure we have an image to remove by checking for a mapped context, or use original
  const imgRef = tag || get(CONTAINERS, `${context && context.toUpperCase()}.ENV.IMAGE`, context)
  !imgRef && generalError(`The docker "image remove" requires a context, name or tag argument!`)

  // Get the image meta data
  const image = await docker.image[ tag ? 'getByTag' : 'get' ](imgRef)

  // Ensure we have the image meta data, and try to remove by imageId
  // __skipThrow is an internal argument, so it's not documented
  if(!image || !image.id)
    return __skipThrow !== true &&
      generalError(`The docker image "${ imgRef }" does not exist!`)

  const res = await docker.image.remove({ item: image.id, force })

  // Log the output of the command
  dockerLog(res, 'image remove')

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
