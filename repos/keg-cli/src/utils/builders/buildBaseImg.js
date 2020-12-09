const { get } = require('@keg-hub/jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')


/**
 * Checks if the base image is tagged with latest, and if not tags it
 * @function
 * @param {Object} image - Metadata about the docker image
 * @param {Object} args - Arguments passed from the initial task
 *
 * @returns {void}
 */
const checkForLatestTag = (image, args) => {
  return image.tag !== 'latest' &&
    runInternalTask(`docker.tasks.image.tasks.tag`, {
      ...args,
      __internal: { image: 'keg-base' },
      params: { context: 'base', tag: 'latest', log: false },
    })
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

  if(exists) return checkForLatestTag(exists, args)

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