
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')

/**
 * Checks if the base image exists, and it not builds it
 * @function
 *
 * @returns {void}
 */
const buildBaseImg = async args => {
  const baseName = getContainerConst('base', `env.image`, 'kegbase')
  const exists = await docker.image.exists(baseName)
  if(exists) return true

  Logger.info(`  Keg base image does not exist, building now...`)
  Logger.empty()

  return runInternalTask(`tasks.docker.tasks.build`, {
    ...args,
    params: { ...args.params, context: 'base' },
  })

}

module.exports = {
  buildBaseImg
}