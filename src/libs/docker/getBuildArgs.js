const { isArr, get, reduceObj, isObj, softFalsy } = require('jsutils')
const { getGitUrl, getGitKey, getTapPath, exists } = require('KegUtils')
const { getRemoteUrl } = require('KegLibs/git/getRemoteUrl')
const { DOCKER } = require('KegConst')
const { DOCKER_ENV } = DOCKER

/**
 * Formats a build-arg string to match the docker cli api
 * @param {*} key - ENV context of the build arg
 * @param {*} value - ENV value of the build arg
 * @param {*} dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with a build arg added
 */
const createBuildArg = (key, value, dockerCmd) => {
  return `${dockerCmd} --build-arg ${ key }=${ value }`.trim()
}

/**
 * Add the ENV's from the context.env files as build args
 * @param {*} buildEnvs - ENVs to be added as build args
 * @param {*} dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with a build args added
 */
const addContextBuildENVs = (buildEnvs, dockerCmd) => {
  return isObj(buildEnvs) &&
    reduceObj(buildEnvs, (key, value, dockerCmd) => {
      return value && createBuildArg(key, value, dockerCmd) || dockerCmd
    }, dockerCmd).trim() || dockerCmd
}

/**
 * Adds build args to the a docker the build command
 *
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {*} { context, branch, dockerCmd }
 * @param {Object} params - Data to build the docker command
 * @param {string} params.context - Name of the image to be built
 * @param {string} params.branch - Branch of the repo to clone (defaults to master)
 * @param {string} params.dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with the build args added
 */
const getBuildArgs = async (globalConfig, params) => {
  const { buildEnvs, context, branch, location, tap } = params
  let dockerCmd = params.dockerCmd || ''
  
  const containerOpts = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }`)
  if(!isObj(containerOpts.ARGS)) return dockerCmd
  
  const gitKey = await getGitKey(globalConfig)
  const tapUrl = context ==='tap' && tap && await getRemoteUrl(getTapPath(globalConfig, tap))

  // Add the context build ENVs to the command
  dockerCmd = addContextBuildENVs(buildEnvs, dockerCmd)

  return reduceObj(containerOpts.ARGS, (key, value, dockerCmd) => {
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
      case 'GIT_CORE_URL':{
        useVal = getGitUrl(globalConfig, 'core')
        break
      }
      case 'GIT_TAP_URL':{
        useVal = tapUrl
        break
      }
    }

    return exists(useVal) ? createBuildArg(key, useVal, dockerCmd) : dockerCmd

  }, dockerCmd).trim()

}

module.exports = {
  getBuildArgs
}