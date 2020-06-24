
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
      __internal: { image: 'kegbase' },
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
  const baseName = getContainerConst('base', `env.image`, 'kegbase')
  const exists = await docker.image.exists(baseName)

  if(exists) return checkForLatestTag(exists, args)

  Logger.info(`  Keg base image does not exist, building now...`)
  Logger.empty()

  return runInternalTask(`tasks.docker.tasks.build`, {
    ...args,
    params: { ...args.params, context: 'base', tap: undefined },
  })

}

module.exports = {
  buildBaseImg
}