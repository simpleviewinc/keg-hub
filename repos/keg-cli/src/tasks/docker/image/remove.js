const docker = require('KegDocCli')
const { get, isStr } = require('@keg-hub/jsutils')
const { exists } = require('KegUtils/helpers/exists')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { DOCKER } = require('KegConst/docker')
const { imageSelect } = require('KegUtils/docker/imageSelect')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { buildCmdContext } = require('KegUtils/builders/buildCmdContext')

/**
 * Asks for the image to remove, then removes it
 * @param {Object} force - Should the image be forced removed
 *
 * @returns {Object} - The removed image
 */
const askRemoveImage = async force => {
  const image = await imageSelect()
  image && await docker.image.remove({ item: image.id, force })

  return image
}

/**
 * Gets the image ids based on the passed in repository name
 * @param {string} repo
 * 
 * @returns {string} - remote docker image ids separated by spaces 
 */
const getRemoteIds = async (repo) => {
  // Get all current images
  const images = await docker.image.list({ errResponse: [], format: 'json' })

  // filter out by repository
  return images &&
    images.length &&
    images.reduce((toRemove, image) => {
      image.repository.includes(repo) &&
        ( toRemove += ` ${ image.id }`)
  
      return toRemove
    }, '').trim()
}

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
  const { 
    context, 
    tag, 
    image:imageParam,
    remote
  } = params

  const force = exists(params.force) ? params.force : getSetting(`docker.force`)

  if(!imageParam && !tag && !context && !remote)  return askRemoveImage(force)

  // Get the image name from the context, or use the passed in context
  const imgRef = imageParam || context &&
    get(DOCKER.CONTAINERS, `${context && context.toUpperCase()}.ENV.IMAGE`) || context

  const remoteUrl = remote && isStr(remote)
    ? remote
    : `${
        get(globalConfig, 'docker.providerUrl')
        + '/' 
        + get(globalConfig, 'docker.namespace') 
        + '/'
        + (imgRef ? imgRef : '')
      }`

  const ids = remote && await getRemoteIds(remoteUrl)
  // Get the image meta data
  const image = tag
    ? await docker.image.getByTag(tag)
    : await buildCmdContext({
        params: { image: imgRef },
        askFor: false,
        globalConfig,
      })

  // If we still don't have an image with an id, then again ask for the image
  if((!image || !image.id) && !ids) return askRemoveImage(force)

  // If we have an image(s), then remove it
  const res = await docker.image.remove({ item: ids || image.id, force })
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
        description: 'Name or ID of the image to remove',
        example: 'keg docker image remove --context core',
      },
      image: {
        description: 'Name or ID of the image to remove',
        example: 'keg docker image remove --image my-image',
      },
      tag: {
        description: 'Tag name of the image to remove',
        example: 'keg docker image remove --tag <tag name>',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image remove --force ',
      },
      remote: {
        description: 'only image(s) downloaded externally. default keg-packages repo',
        example: 'keg docker image remove --remote <url>',
      },
    },
  }
}
