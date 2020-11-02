const { CONTAINER_TO_CONTEXT } = require('KegConst/constants')
const docker = require('KegDocCli')
const { get } = require('@keg-hub/jsutils')

/**
 * Finds the proxy domain from a label of the passed in docker reference item
 * @function
 * @param {string} itemRef - Docker reference item
 * @param {string} [type=container] - Type of reference item to search for
 * @param {boolean} logErr - Should an error be logged
 *
 * @returns {string|false} - Found proxy domain if it exists or false
 */
const getProxyDomainFromLabel = async (itemRef, type='container', logErr) => {
  
  try {
    const item = CONTAINER_TO_CONTEXT[itemRef] || itemRef
    const itemInspect = await docker[type].inspect({ item, log: false, skipError: true })
    const itemLabels = get(itemInspect, 'config.Labels', get(itemInspect, 'Config.Labels', {}))

    return Object.entries(itemLabels)
      .reduce((proxyDomain, [ key, value ]) => {
        return proxyDomain || (key === 'com.keg.proxy.domain' && value)
      }, false)
  }
  catch(err){
    logErr && Logger.warn(err.stack)

    return false
  }
}


module.exports = {
  getProxyDomainFromLabel
}
