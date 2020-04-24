const { reduceObj, isArr, get } = require('jsutils')
const { getPathFromConfig } = require('KegUtils')
const { DOCKER } = require('KegConst')

/**
 * Gets the mount paths for mounting local volumes to the docker container
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Array} mounts - Key names of paths to be mounted in the docker container
 * @param {string} container - Name of container to get the default mounts for
 *
 
 * @returns {Object} - Key/Value pair of local / remote paths
 */
const getDirsToMount = (globalConfig, mounts, container='') => {
  const volPaths = get(DOCKER, `VOLUMES.${container.toUpperCase()}.PATHS`, {})

  return isArr(mounts) && mounts.reduce((dirs, key) => {

    const localPath = volPaths[key] && getPathFromConfig(globalConfig, key)
    localPath && ( dirs[localPath] = volPaths[key] )

    return dirs
  }, {})
}


module.exports = {
  getDirsToMount
}