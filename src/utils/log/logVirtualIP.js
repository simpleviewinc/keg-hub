const docker = require('KegDocApi')
const { Logger } = require('KegLog')

/**
 * Helper that Gets and logs the Virtual Machines IP address
 */
const logVirtualIP = async () => {
  const vmIP = await docker.machine.getIP()

  Logger.empty()

  Logger.message(` Application is being served at: `, `http://tap.kegdev.xyz/`)
  Logger.message(` Virtual Machine's IP Address: `, `http://${vmIP}`)

  Logger.warn(` Use the above URL or IP to access your application.`)
  Logger.empty()

}

module.exports = {
  logVirtualIP
}