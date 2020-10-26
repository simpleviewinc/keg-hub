const { Logger } = require('KegLog')
const { TAP_URL } = require('KegConst/constants')

/**
 * Helper that Gets and logs the Virtual Machines IP address
 */
const logVirtualUrl = (context) => {
  if(context === 'proxy') return Logger.empty()

  const useUrl = context
    ? context === 'components'
      ? TAP_URL.replace('tap.', 'comp.')
      : TAP_URL.replace('tap.', `${context}.`)
    : TAP_URL

  Logger.empty()

  Logger.pair(` Application is being served at: `, useUrl)
  Logger.warn(` Use the above URL or IP to access your application.`)

  Logger.empty()

}

module.exports = {
  logVirtualUrl
}