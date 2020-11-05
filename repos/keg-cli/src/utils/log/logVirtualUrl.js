const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { isStr } = require('@keg-hub/jsutils')
/**
 * Helper that Gets and logs the Virtual Machines IP address
 * @param {Object|string} composeData - Object used to build the proxy compose config || virtual domain to log
 * @param {string} proxyHost - The proxy host domain url
 */
const logVirtualUrl = (composeData, proxyHost) => {
  if(!composeData) return

  const virtualUrl = isStr(composeData)
    ? composeData
    : `${composeData.proxyDomain}.${proxyHost || DOCKER.KEG_PROXY_HOST}`

  Logger.empty()

  Logger.pair(` Application is being served at: `, `http://${virtualUrl}`)
  Logger.warn(` Use the above URL or IP to access your application.`)

  Logger.empty()

}

module.exports = {
  logVirtualUrl
}