const { KEG_ENVS } = require('KegConst/envs')
const { CONTAINER_TO_CONTEXT } = require('KegConst/constants')

/**
 * Builds the full keg-proxy host domain using the passed in context and tag
 * @function
 * @param {string} kegProxyHost - ENV Value of KEG_PROXY_HOST for the context
 * @param {string} context - Name or context to build the container from
 * @param {string} tag - Tag || branch of the docker image
 *
 * @returns {Array} - opts array with the keg-proxy labels added
 */
const getProxyHost = (kegProxyHost, context, tag) => {
  const hostContext = CONTAINER_TO_CONTEXT[context] || context
  const subDomain = tag && hostContext ? `${hostContext}-${tag}.` : !hostContext  ? `${tag}.` : `${hostContext}.`
  
  // If the padded in proxyHost is not the same as the default, then use it
  // Otherwise build the host with the subDomain and default proxy host
  return kegProxyHost !== KEG_ENVS.KEG_PROXY_HOST
    ? kegProxyHost
    : `${subDomain}${KEG_ENVS.KEG_PROXY_HOST}`
}


module.exports = {
  getProxyHost
}
