const { Logger } = require('KegLog')
const { TAP_URL } = require('KegConst')

/**
 * Helper that Gets and logs the Virtual Machines IP address
 */
const logVirtualUrl = () => {
  Logger.empty()

  Logger.message(` Application is being served at: `, TAP_URL)
  Logger.warn(` Use the above URL or IP to access your application.`)

  Logger.empty()

}

module.exports = {
  logVirtualUrl
}