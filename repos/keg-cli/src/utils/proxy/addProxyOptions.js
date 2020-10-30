const { DOCKER } = require('KegConst/docker')
const { pickKeys } = require('@keg-hub/jsutils')
const { getProxyHost } = require('./getProxyHost')
const { proxyLabels } = require('KegConst/docker/labels')
const { buildLabel } = require('KegUtils/helpers/buildLabel')

/**
 * Gets the envs to replace the values in the proxy label tempaltes
 * @function
 * @param {Object} contextEnvs - Envs for the container
 *
 * @returns {Object} - Envs used in the proxy label templates
 */
const getProxyEnvs = contextEnvs => {
  const {
    KEG_PROXY_PORT=19006,
    KEG_PROXY_ENTRY='keg',
    KEG_PROXY_HOST=DOCKER.KEG_PROXY_HOST,
    KEG_DOCKER_NETWORK=DOCKER.KEG_DOCKER_NETWORK,
  } = pickKeys(contextEnvs, [
    'KEG_PROXY_ENTRY',
    'KEG_PROXY_HOST',
    'KEG_PROXY_PORT',
    'KEG_DOCKER_NETWORK',
  ])

  return {
    KEG_PROXY_ENTRY,
    KEG_PROXY_HOST,
    KEG_PROXY_PORT,
    KEG_DOCKER_NETWORK,
  }
}

/**
 * Adds the required keg-proxy labels to the docker command options
 * <br/>This allows the container to register with the keg-proxy
 * @function
 * @param {Array} opts - Options for the docker run command
 * @param {Object} containerContext - Parsed container context from the buildContainerContext method
 * @param {Object} containerContext.contextEnvs - Envs for the container
 * @param {Object} parsed - Parsed docker package url
 * @param {string} parsed.tag - Tag || branch of the docker package url
 * @param {string} parsed.image - Name of the image to build the container from
 *
 * @returns {Array} - opts array with the keg-proxy labels added
 */
const addProxyOptions = (opts=[], { contextEnvs }, { tag, image, context }, network) => {
  const proxyRef = (context || image || tag)
    .replace(/keg-/g, '')
    .replace(/tap-/g, '')

  const proxyEnvs = getProxyEnvs(contextEnvs)
  const proxyHost = getProxyHost(
    proxyEnvs.KEG_PROXY_HOST || '',
    proxyRef,
    proxyRef !== tag ? tag : ''
  )

  proxyLabels.map(item => {
    const envKey = item[0]
    const label = item[item.length -1] 
    opts.push(
      `--label ` +
      buildLabel(
        label,
        envKey,
        envKey === 'KEG_PROXY_HOST' ? proxyHost : proxyEnvs[envKey],
        proxyRef
      )
    )
  })

  opts.push(`--network ${network || proxyEnvs.KEG_DOCKER_NETWORK}`)

  return opts

}

module.exports = {
  addProxyOptions
}
