const { getProxyDomainFromBranch } = require('./getProxyDomainFromBranch')
const { getProxyDomainFromLabel } = require('./getProxyDomainFromLabel')
const { get } = require('@keg-hub/jsutils')

/**
 * Gets the proxyDomain from the docker image labels based on passed in params
 * @function
 * @param {Object} params - Parameters passed to the task from the cmd line
 * @param {Object} contextData - Data derived from the current context and command
 *
 * @returns {string} - The found proxyDomain
 */
const getDomainLabel = (params, contextData) => {
  const { image, tag } = params
  const { id, rootId } = contextData
  const fromLabel = Boolean((image && tag) || id)
  const labelRef = fromLabel && (id || (tag && image ? `${image}:${tag}` : image))

  return getProxyDomainFromLabel(labelRef, rootId ? 'image' : 'container')
}

/**
 * Gets the proxyDomain from the local git branch of the passed in context
 * @function
 * @param {Object} params - Parameters passed to the task from the cmd line
 * @param {Object} contextEnvs - Built environment variables for the service
 * @param {Object} contextData - Data derived from the current context and command
 *
 * @returns {string} - The found proxyDomain
 */
const getDomainBranch = (params, contextEnvs, contextData) => {
  contextName = get(params, `__injected.tap`) ||
    get(params, `tap`) ||
    get(params, `__injected.context`) ||
    contextData.cmdContext ||
    contextData.context ||
    get(params, `context`)

  return getProxyDomainFromBranch(
    contextName,
    get(contextEnvs, `KEG_CONTEXT_PATH`)
  )
}

/**
 * Gets the proxyDomain from a docker label, or git branch based on passed in params
 * @function
 * @param {Object} args.params - Parameters passed to the task from the cmd line
 * @param {Object} args.contextData - Data derived from the current context and command
 * @param {Object} contextEnvs - Built environment variables for the service
 *
 * @returns {string} - The found proxyDomain
 */
const getKegProxyDomain = ({ params={}, contextData={} }, contextEnvs) => {
  // If it has a rootId then we are geting the proxyDomain for a docker image
  // Of a docker image will have a rootId
  return contextData.rootId || contextData.id || (params.image && params.tag)
    ? getDomainLabel(params, contextData)
    : getDomainBranch(params, contextEnvs, contextData)
}

module.exports = {
  getKegProxyDomain
}