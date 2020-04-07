const { reduceObj, isArr } = require('jsutils')
const { getPathFromConfig } = require('KegUtils')
const { DOCKER } = require('KegConst')

/**
 * Gets the mount paths for mounting local volumes to the docker container
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Array} mounts - Key names of paths to be mounted in the docker container
 *
 * @returns {Object} - Key/Value pair of local / remote paths
 */
const getDirsToMount = (globalConfig, mounts) => {
  return isArr(mounts) && mounts.reduce((dirs, key) => {

    const localPath = DOCKER.MOUNT_PATHS[key] && getPathFromConfig(globalConfig, key)
    localPath && ( dirs[localPath] = DOCKER.MOUNT_PATHS[key] )

    return dirs
  }, {})
}


module.exports = {
  getDirsToMount
}