const fs = require('fs')
const { reduceObj, isStr, isArr, get } = require('jsutils')
const { getPathFromConfig } = require('KegUtils')
const { DOCKER } = require('KegConst')
const { getContainerConst } = require('./getContainerConst')

/**
 * Adds location as a mounted volume to the dockerCmd
 * @param {string} location - Local location of the tap to mount
 * @param {string} [dockerCmd=''] - Docker command to add the mounted tap to
 *
 * @returns {string} - dockerCmd with the mounted tap arg added
 */
const getAppMount = (dockerCmd, context, location) => {
  const mountPath = getContainerConst(context, `ENV.DOC_APP_PATH`)

  return mountPath
    ? `${dockerCmd} -v ${location}:${ mountPath }`
    : dockerCmd

}

/**
 * Gets the folders to mount from the passed in mounts argument
 * @param {string} mounts - Comma separated Folders to mount
 * @param {string} env - Environment to run the container in
 * @param {string} container - Name of container to get the default mounts for
 *
 * @returns {Array} - Groups of name repos or folder paths to mount into the container
 */
const getMountDefaults = (mounts, env, container='') => {
  const custom = isStr(mounts)
    ? mounts.split(',')
    : []

  const defMounts = get(DOCKER, `VOLUMES.${container.toUpperCase()}.DEV_DEFAULTS`, [])

  return !env || env === 'development'
    ? defMounts.concat(custom)
    : custom
}

/**
 * Gets the mount paths for mounting local volumes to the docker container
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Array} mounts - Key names of paths to be mounted in the docker container
 * @param {string} container - Name of container to get the default mounts for
 *
 
 * @returns {Object} - Key/Value pair of local / remote paths
 */
const getDirsToMount = (globalConfig, mounts, env, container='') => {

  mounts = getMountDefaults(mounts, env, container)

  // If nothing to mount, just return
  if(!mounts.length) return false

  const volPaths = get(DOCKER, `VOLUMES.${container.toUpperCase()}.PATHS`, {})

  return isArr(mounts) && mounts.reduce((dirs, key) => {
    const localPath = volPaths[key] && getPathFromConfig(globalConfig, key)
    localPath && ( dirs[localPath] = volPaths[key] )

    return dirs
  }, {})
}

/**
 * Formats volume mounts into a docker string format from an object
 * @param {Object} dirs - Key/Value pairs of folder paths to mount
 * @param {string} [dockerCmd=''] - Docker command to add mounts to
 *
 * @returns {string} - Volume mounts joined as a docker formatted string
 */
const getVolumeMounts = (dirs, dockerCmd='') => {
  return reduceObj(dirs, (local, mount, joinedCmd) => {
    return fs.existsSync(local) && isStr(mount)
      ? `${joinedCmd} -v ${local}:${mount}`
      : joinedCmd
  }, dockerCmd)
}

module.exports = {
  getDirsToMount,
  getAppMount,
  getVolumeMounts,
}
