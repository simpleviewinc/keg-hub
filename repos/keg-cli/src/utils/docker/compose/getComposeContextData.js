const { get } = require('@keg-hub/jsutils')
const { DOCKER } = require('KegConst/docker')
const { getProxyDomainFromBranch } = require('KegUtils/proxy/getProxyDomainFromBranch')

/**
 * Builds context data needed to create the injected docker-compose file
 * @function
 * @param {Object} data - Data to fill the compose template with
 *
 * @returns {Object} - Build compose context data
 */
const getComposeContextData = async data => {
  const composeContext = {}

  // The the docker image name for the service being started
  composeContext.image = get(
    data, `params.__injected.image`,
    get(data, `contextEnvs.IMAGE`)
  )

  // Get the root path where the docker container should be built from
  composeContext.buildContextPath = get(
    data, `params.__injected.injectPath`,
    get(data, `contextEnvs.KEG_CONTEXT_PATH`, '${KEG_CONTEXT_PATH}')
  )

  // Get the path to the Dockerfile
  composeContext.dockerPath = get(
    data, `params.__injected.dockerPath`,
    get(data, `contextEnvs.KEG_DOCKER_FILE`, '${KEG_DOCKER_FILE}')
  )

  // Get the shared docker network
  composeContext.dockerNetwork = get(
    data, `contextEnvs.KEG_DOCKER_NETWORK`,
    get(DOCKER, `KEG_DOCKER_NETWORK`, '${KEG_DOCKER_NETWORK}')
  )

  // The the docker container name for the service being started
  composeContext.container = get(
    data, `params.__injected.container`,
    get(data, `params.container`,
      get(data, `contextEnvs.CONTAINER_NAME`, composeContext.image)
    )
  )

  // Get the name of the tap or use the context for internal applications
  const contextName = get(
    data, `params.__injected.tap`,
    get(data, `params.tap`,
      get(data, `params.__injected.context`,
        get(data, `params.context`)
      ),
    )
  )

  composeContext.proxyDomain = await getProxyDomainFromBranch(
    contextName,
    composeContext.buildContextPath
  )

  return composeContext
}

module.exports = {
  getComposeContextData
}