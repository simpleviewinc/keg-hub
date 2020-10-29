const { get } = require('@keg-hub/jsutils')
const { DOCKER } = require('KegConst/docker')
const { KEG_ENVS } = require('KegConst/envs')
const { CONTAINER_TO_CONTEXT } = require('KegConst/constants')

/**
 * Builds the an option string to be added to a docker command
 * @function
 * @param {Array} opts - Array of already built options
 * @param {string} name - Option name to build ( label, network, etc... )
 * @param {string} value - Value of the option
 *
 * @returns {Array} - opts array with the keg-proxy labels added
 */
const addOption = (opts, name, value) => {
  opts.push(`--${name} ${value}`)
  return opts
}

/**
 * Builds the full keg-proxy host domain using the passed in image and tag
 * @function
 * @param {string} kegProxyHost - ENV Value of KEG_PROXY_HOST for the image
 * @param {string} tag - Tag || branch of the docker package url
 * @param {string} image - Name of the image to build the container from
 *
 * @returns {Array} - opts array with the keg-proxy labels added
 */
const getProxyHost = (kegProxyHost, image, tag) => {
  const context = CONTAINER_TO_CONTEXT[image] || image
  const subDomain = tag && context ? `${context}-${tag}.` : !context  ? `${tag}.` : `${context}.`
  
  // If the padded in proxyHost is not the same as the default, then use it
  // Otherwise build the host with the subDomain and default proxy host
  return kegProxyHost !== KEG_ENVS.KEG_PROXY_HOST
    ? kegProxyHost
    : `${subDomain}${KEG_ENVS.KEG_PROXY_HOST}`
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
const addProxyOptions = (opts=[], { contextEnvs }, { tag, image }, network) => {
  const proxyContext = tag || image

  const proxyHost = getProxyHost(
    get(contextEnvs, `KEG_PROXY_HOST`, ''),
    image,
    tag
  )

  addOption(
    opts,
    `label`,
    `traefik.http.routers.${proxyContext}.rule=Host(\`${proxyHost}\`)`
  )
  addOption(
    opts,
    `label`,
    `traefik.http.routers.${proxyContext}.entrypoints=keg`
  )
  addOption(
    opts,
    `label`,
    `traefik.http.services.${proxyContext}.loadbalancer.server.port=${get(contextEnvs, `KEG_PROXY_PORT`)}`
  )

  addOption(
    opts,
    `network`,
    network || get(contextEnvs, `KEG_DOCKER_NETWORK`, DOCKER.KEG_DOCKER_NETWORK)
  )

  return opts
}

module.exports = {
  addProxyOptions
}
