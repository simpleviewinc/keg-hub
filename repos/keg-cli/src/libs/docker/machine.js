const { executeCmd } = require('KegProc')
const { get, isStr } = require('@svkeg/jsutils')
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

/*
 * Adds docker-machine ssh in front of the passed in docker command
 * <br/>This forces the docker command to be run on the docker-machine, and not the local
 * Same as running docker-machine ssh docker-keg docker image ls
 * @params {string} dockerCmd - Docker command to be run
 *
 * @returns {string} - Docker command with docker-machine ssh <machine name> in front of it
*/
const addMachineSSH = (dockerCmd) => {
  return `docker-machine ssh ${ NAME } ${ dockerCmd }`
}

module.exports = {
  addMachineSSH,
  getEnv,
  getIP
}