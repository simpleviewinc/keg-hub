const { executeCmd } = require('KegProc')
const { get, isStr } = require('@keg-hub/jsutils')
const { apiError } = require('./helpers')
const { MACHINE } = require('KegConst/docker/machine')
const { NAME } = MACHINE

/**
 * Gets the Ip address of the virtual machine running the docker contianer
 * This is the address the should be used to visit the website
 * This is also the address the react-native packager serves content from
 *
 * @returns {string} - IP address of the virtual machine
 */
const getIP = async () => {
  const { error, data } = await executeCmd(`docker-machine ip ${ NAME }`)
  error && apiError(error)

  return data && data.trim()
}

/*
 * Sets up the docker-machine env
 * Same as running eval "$(docker-machine env ${ get(DOCKER, `MACHINE.NAME`) })"
 *
 * @returns {string} - ENVs for docker machine
*/
const  getEnv = async () => {
  const { error, data, exitCode } = await executeCmd(
    `docker-machine env ${ NAME }`
  )

  error && apiError(error)

  return data.split('\n')
    .reduce((config, item) => {
      if(item.indexOf('export') !== 0) return config

      const machineEnv = item.replace('export', '').trim()
      const envSplit = machineEnv.split('=')
      config[envSplit[0]] = envSplit[1]

      return config
    }, {})

}

module.exports = {
  getEnv,
  getIP
}