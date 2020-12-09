const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { get } = require('@keg-hub/jsutils')
const { getFromImage } = require('KegUtils/getters/getFromImage')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')

/**
 * Checks if the found base image's tags matches the the desired base tag
 * @function
 * @param {Object} image - Docker image object from the docker api
 * @param {string} baseFromTag - Found base from tag
 *
 * @returns {boolean} - Does the image object have a matching baseFromTag tag
 */
const checkMatchingTag = (image, baseFromTag) => {
  return image.tag === baseFromTag || image.tags && image.tags.includes(baseFromTag)
}

/**
 * Gets the base tag from the KEG_BASE_IMAGE env or the getFromImg helper
 * @function
 * @param {Object} params - Parsed command line options
 * @param {string} buildContext - The current build context
 *
 * @returns {string} - Found base image tag
 */
const getBaseTag = (params, buildContext) => {

  const baseFromImg = getContainerConst(buildContext, `env.keg_base_image`)
  const baseFromTag = baseFromImg && baseFromImg.includes(':') && baseFromImg.split(':')[1]
  if(baseFromTag) return baseFromTag

  const fromImg = getFromImage(params, getContainerConst(buildContext, 'env'), buildContext)
  const fromTag = fromImg.includes(':') && fromImg.split(':')[1]

  return fromTag || get(params, 'env') || getSetting('defaultEnv')
}

/**
 * Checks if the base image exists, and it not builds it
 * @function
 * @param {Object} args - Arguments passed from the initial task
 *
 * @returns {void}
 */
const buildBaseImg = async args => {
  const buildContext = get(args, `params.__injected.tap`, get(args, 'params.context'))

  // If it's a tap, check if we should build the base image
  const shouldBuildBase = buildContext && getContainerConst(buildContext, `env.keg_from_base`, true)
  if(!shouldBuildBase) return args

  const baseName = getContainerConst('base', `env.image`, 'keg-base')
  const exists = await docker.image.exists(baseName)

  // Get the base from tag, and check if it matches the found image tag
  // If it does, then we have the correct base image, so no need to build 
  const baseTag = exists && getBaseTag(args.params, buildContext)

  if(baseTag && checkMatchingTag(exists, baseTag)) return true

  Logger.empty()
  Logger.info(`Keg base image does not exist...`)

  return runInternalTask(`tasks.docker.tasks.build`, {
    ...args,
    __internal: { ...args.__internal },
    params: {
    ...args.params,
    tap: undefined,
    context: 'base',
    image: 'keg-base',
    tagVariable: 'env',
  }})

}

module.exports = {
  buildBaseImg
}