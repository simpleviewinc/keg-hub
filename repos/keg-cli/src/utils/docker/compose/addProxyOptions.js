const docker = require('KegDocCli')
const { get } = require('@keg-hub/jsutils')
const { KEG_DOCKER_NETWORK } = require('KegConst/docker')

/**
 * TODO: Make this more dynamic, so it can handel of types of containers
 * Should pull in the image to be built, and use the labels from that image
 * If missing the correct labels, then use the current code below
 * Also move this to utils, so it can be reused by other tasks ( i.e. image run task )
*/

const addOption = (opts, label, value) => {
  opts.push(`--${label} ${value}`)
  return opts
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
const addProxyOptions = (opts=[], { contextEnvs }, { tag, image }) => {
  
  const proxyHost = get(contextEnvs, `KEG_PROXY_HOST`, `tap.local.kegdev.xyz`).replace('tap', tag)

  addOption(
    opts,
    `label`,
    `traefik.http.routers.${tag}.rule=Host(\`${proxyHost}\`)`
  )
  addOption(
    opts,
    `label`,
    `traefik.http.services.${tag}.loadbalancer.server.port=${get(contextEnvs, `KEG_PROXY_PORT`)}`
  )
  addOption(
    opts,
    `label`,
    `traefik.http.routers.${tag}.entrypoints=keg`
  )
  addOption(
    opts,
    `network`,
    KEG_DOCKER_NETWORK
  )

  return opts
}

module.exports = {
  addProxyOptions
}
