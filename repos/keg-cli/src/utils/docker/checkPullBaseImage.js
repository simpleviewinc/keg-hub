const docker = require('KegDocCli')
const { getBaseTag } = require('../getters/getBaseTag')
const { exists, get, isObj } = require('@keg-hub/jsutils')
const { getFromImage } = require('../getters/getFromImage')
const { getKegContext } = require('../getters/getKegContext')
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
const shouldPullBase = (forcePull, paramsPull, internalForce, fromBase) => {
  return exists(forcePull)
    ? forcePull
    : exists(paramsPull)
      ? paramsPull
      : exists(internalForce)
        ? internalForce
        : exists(fromBase)
          ? fromBase
          : true
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
    forcePull,
    get(args, 'params.pull'),
    get(args, '__internal.forcePull'),
    getContainerConst(cmdContext, `env.keg_from_base`),
  )

  if(!pullBase) { isNewImage: false }

  // Get the from image, without the provider infro
  const fromImg = getFromImage(args.params, getContainerConst(cmdContext, 'env'), cmdContext)
  const imageMeta = fromImg.split('/').pop()

  // Try to find the base tag, will default to current env if not tag found
  const tagName = getBaseTag(args.params, cmdContext, fromImg)

  // Remove the tagName if needed
  const [ imageName ] = imageMeta.includes(':')
    ? imageMeta.split(':')
    : [ imageMeta ]

  return runInternalTask('docker.tasks.provider.tasks.pull', {
    ...args,
    params: {
      ...args.params,
      tag: tagName,
      tap: undefined,
      image: imageName || 'keg-base',
      context: imageName && getKegContext(imageName) || 'base',
    }
  })

}


module.exports = {
  checkPullBaseImage
}