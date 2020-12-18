const docker = require('KegDocCli')
const { getBaseTag } = require('../getters/getBaseTag')
const { exists, get, isObj } = require('@keg-hub/jsutils')
const { runInternalTask } = require('../task/runInternalTask')
const { shouldPullImage } = require('../helpers/shouldPullImage')
const { getContainerConst } = require('../docker/getContainerConst')

/**
 * Checks if the base image should be pulled
 * @function
 * @param {string} cmdContext - The current context of the task being run ( core, components, tap ... )
 * @param {boolean} internalForce - Internal Keg-CLI argument to force pulling the keg-base image
 * @param {boolean} forcePull - Force pull the base image
 *
 * @returns {boolean} - Should the keg-base image be pulled
 */
const shouldPullBase = (cmdContext, internalForce, forcePull) => {
  return exists(forcePull)
    ? forcePull
    : exists(internalForce)
      ? internalForce
      : getContainerConst(cmdContext, `env.keg_from_base`, true)
}

/**
 * Checks if the base image should be pulled, then pulls it when true
 * @function
 * @param {Object} args - Args object passed to a task.action method
 * @param {string} cmdContext - The current context of the task being run ( core, components, tap ... )
 * @param {boolean} * forcePull - Force pull the base image
 *
 * @returns {string} - Found base image tag
 */
const checkPullBaseImage = async (args, cmdContext, forcePull) => {
  const pullBase = shouldPullBase(
    cmdContext,
    get(args, '__internal.forcePull'),
    forcePull
  )

  return pullBase
    ? await runInternalTask('docker.tasks.provider.tasks.pull', {
        ...args,
        params: {
          ...args.params,
          context: 'base',
          image: 'keg-base',
          tap: undefined,
          // Try to find the base tag, will default to current env if not tag found
          tag: getBaseTag(args.params, cmdContext)
        }
      })
    : { isNewImage: false }

}


module.exports = {
  checkPullBaseImage
}