const { get } = require('@keg-hub/jsutils')
const { throwNoDockerImg } = require('KegUtils/error/throwNoDockerImg')
const { DOCKER } = require('KegConst/docker')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { dockerLog } = require('KegUtils/log/dockerLog')

/**
 * Get a docker image object
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const getImage = async args => {

  const { params, __internal={} } = args
  const { context, image, tag } = params

  // Check the name for a tag ref, or use the passed in name and tag
  let [ nameRef, tagRef ] = context.indexOf(':') !== -1 ? context.split(':') : [ context, tag ]

  // Ensure we have an image to remove by checking for a mapped nameRef, or use original
  let imgRef = image || get(
    DOCKER,
    `CONTAINERS.${nameRef && nameRef.toUpperCase()}.ENV.IMAGE`,
    nameRef
  )

  !imgRef && throwNoDockerImg(null, `The docker "image get" task requires a name or tag argument!`)

  imgRef = tagRef ? `${imgRef}:${tagRef}` : imgRef

  // Get the image meta data
  const foundImg = await docker.image.get(imgRef)

  // Log the output of the command
  __internal.skipLog !== true && Logger.data(foundImg)

  return foundImg

}

module.exports = {
  get: {
    name: 'get',
    alias: [ 'gt', 'g' ],
    action: getImage,
    description: `Get docker image by name or id`,
    example: 'keg docker image get <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Context, name or id of the image to get, optionally with the tag.',
        example: 'keg docker image get --name core:0.1.4 ( tag optional )',
        required: true,
      },
      tag: {
        description: 'Tag name of the image to get',
        example: 'keg docker image get --tag <tag name>',
      }
    },
  }
}
