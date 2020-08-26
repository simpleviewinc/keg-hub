const os = require('os')

/**
 * Gets the internal IP address of the host machine
 * @function
 *
 * @returns {string} - Found internal IP address
 */
const getInternalIp = () => {
  const interfaces = os.networkInterfaces()

  return Object.keys(interfaces).reduce((ipAddress, ifName) => {

    return ipAddress || interfaces[ifName].reduce((ip, iFace) => {
      const { family, internal, address } = iFace

      return ip || (family !== 'IPv4' || internal !== false || address === '127.0.0.1')
          ? ip
          : address

    }, false)

  }, false)
}

module.exports = {
  getInternalIp
}