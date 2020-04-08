const { executeCmd } = require('KegProc')
const { isStr } = require('jsutils')

/**
 * Gets the Ip address of the virtual machine running the docker contianer
 * This is the address the should be used to visit the website
 * This is also the address the react-native packager serves content from
 *
 * @returns {string} - IP address of the virtual machine
 */
const getVirtualIP = async () => {
  const { error, data } = await executeCmd(`docker-machine ip`)
  if(error) throw new Error(error)

  return data && data.trim()

}

module.exports = {
  getVirtualIP
}