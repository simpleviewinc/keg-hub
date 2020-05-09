const { isArr, get, reduceObj, isObj, softFalsy } = require('jsutils')
const { getGitUrl, getGitKey, exists } = require('KegUtils')
const { DOCKER } = require('KegConst')
const { BUILD, DOCKER_ENV } = DOCKER

/**
 * Formats a build-arg string to match the docker cli api
 * @param {*} key - ENV name of the build arg
 * @param {*} value - ENV value of the build arg
 * @param {*} dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with a build arg added
 */
const createBuildArg = (key, value, dockerCmd) => {
  return `${dockerCmd} --build-arg ${ key }=${ value }`
}

/**
 * Adds build args to the a docker the build command
 *
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {*} { name, branch, dockerCmd }
 * @param {Object} params - Data to build the docker command
 * @param {string} params.name - Name of the image to be built
 * @param {string} params.branch - Branch of the repo to clone (defaults to master)
 * @param {string} params.dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with the build args added
 */
const getBuildArgs = async (globalConfig, { container, name, branch, dockerCmd }) => {
  
  const buildOpts = get(DOCKER, [ 'BUILD', (container || name).toUpperCase() ])
  if(!isObj(buildOpts.ARGS)) return dockerCmd
  
  const gitKey = await getGitKey(globalConfig)
  
  return reduceObj(buildOpts.ARGS, (key, value, dockerCmd) => {
    let useVal
    switch(key){
      case 'GIT_KEY':{
        useVal = gitKey
        break
      }
      case 'GIT_CLI_URL':{
        DOCKER_ENV !== 'local' && ( useVal = getGitUrl(globalConfig, 'cli') )
        break
      }
      case 'GIT_TAP_URL':{
        useVal = getGitUrl(globalConfig, name, branch)
        break
      }
    }

    return exists(useVal) ? createBuildArg(key, useVal, dockerCmd) : dockerCmd

  }, dockerCmd)

}

module.exports = {
  getBuildArgs
}