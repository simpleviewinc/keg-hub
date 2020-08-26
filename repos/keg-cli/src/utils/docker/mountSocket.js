// docker run -d -p 80:80 -p 443:443 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
// ln -s ~/Library/Containers/com.docker.docker/Data/docker.sock /var/run/docker.sock
const { pathExists } = require('KegFileSys')
const { getOS } = require('../getters/getOS')
const { executeCmd } = require('KegProc')
const { generalError } = require('../error/generalError')

const socketPath = `/var/run/docker.sock`
const osSocketPaths = {
  mac: `~/Library/Containers/com.docker.docker/Data/docker.sock`,
}

/**
 * Checks if a path exists on the local file system
 * @function
 * @param {string} checkPath - Path to check if exists
 *
 * @returns {boolean} - If the path exists
 */
const checkPathExists = async checkPath => {
  const [ err, exists ] = await pathExists(checkPath)
  err && generalError(err.stack)

  return exists
}

/**
 * Ties to create it with a sym-link baed on the os
 * @function
 * @param {string} dockerCmd - Docker command being built
 * @param {string} altPath - Alternate container path where to mount the socket
 *
 * @returns {string} - The dockerCmd with the argument to mount the local docker socket
 */
const addSymLink = async (dockerCmd, altPath) => {
  // Get the current operating system
  const localSocket = osSocketPaths[ getOS() ]
  const exist = checkPathExists(localSocket)
  !exist && generalError(`Can't sym-link local docker socket, it does not exist at ${ localSocket }`)

  // Add symLink for that operating system
  await executeCmd(`ln -s ${ localSocket } ${ socketPath }`)

  // Add the argument to bind the local socket
  return addSocketMount(dockerCmd, socketPath, altPath)
}

/**
 * Adds the argument to mount the local docker socket to a docker container
 * @function
 * @param {string} dockerCmd - Docker command being built
 * @param {string} local - Location where the docker socket exists locally
 * @param {string} container - container path where to mount the socket
 *
 * @returns {string} - The dockerCmd with the argument to mount the local docker socket
 */
const addSocketMount = (dockerCmd, local, container) => {
  return `${ dockerCmd } -v ${ local }:${ container }`
}

/**
 * Checks if the docker socket exists at the default location
 * If it does it adds the volume argument to mount to to the container
 * If it does not, it ties to create it with a sym-link baed on the os
 * @function
 * @param {string} dockerCmd - Docker command being built
 * @param {string} altPath - Alternate container path where to mount the socket
 *
 * @returns {string} - The dockerCmd with the argument to mount the local docker socket
 */
const mountSocket = async (dockerCmd='', altPath=socketPath) => {
  const exists = await checkPathExists(socketPath)

  return exists
    ? addSocketMount(dockerCmd, socketPath, altPath)
    : addSymLink(dockerCmd, altPath)
}

module.exports = {
  mountSocket
}