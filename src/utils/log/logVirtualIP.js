const { getVirtualIP } = require('KegDocker/getVirtualIP')
const { Logger } = require('KegLog')

/**
 * Helper that Gets and logs the Virtual Machines IP address
 */
const logVirtualIP = async () => {
  const vmIP = await getVirtualIP()

  Logger.empty()
  console.log(
    Logger.colors.cyan(` Application is being served at: `),
    Logger.colors.brightWhite(`http://tap.kegdev.xyz/`),
  )
  Logger.info(` Virtual Machine's IP Address: http://${vmIP}`)
  Logger.warn(` Use the above URL or IP to access your application.`)
  Logger.empty()

}

module.exports = {
  logVirtualIP
}