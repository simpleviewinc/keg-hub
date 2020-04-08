const { getVirtualIP } = require('KegDocker/getVirtualIP')
const { Logger } = require('KegLog')

/**
 * Helper that Gets and logs the Virtual Machines IP address
 */
const logVirtualIP = async () => {
  const vmIP = await getVirtualIP()
  Logger.empty()
  Logger.info(`Virtual Machine's IP Address: http://${vmIP}`)
  Logger.warn(`Use this IP in your browser. NOT the IP provided by Expo!`)
  Logger.empty()
}

module.exports = {
  logVirtualIP
}