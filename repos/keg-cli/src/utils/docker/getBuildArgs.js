const { isArr, get, reduceObj, isObj, softFalsy } = require('@keg-hub/jsutils')
const { getGitUrl, getGitKey, getTapPath, exists } = require('KegUtils')
const { getRemoteUrl } = require('KegUtils/git/getRemoteUrl')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')

/**
 * Adds build args to the a docker the build command
 *
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {*} { context, branch, dockerCmd }
 * @param {Object} params - Data to build the docker command
 * @param {string} params.context - Name of the image to be built
 * @param {string} params.branch - Branch of the repo to clone (defaults to master)
 * @param {string} dockerCmd - The docker command being built
 *
 * @returns {string} - The dockerCmd string with the build args added
 */
const getBuildArgs = async (globalConfig, params, dockerCmd='') => {
  const { buildArgs, context, branch, location, tap } = params

  const containerOpts = get(DOCKER, `CONTAINERS.${ context.toUpperCase() }`)
  if(!isObj(containerOpts.ARGS)) return dockerCmd
  
  const gitKey = await getGitKey(globalConfig)
  const tapUrl = context ==='tap' && tap && await getRemoteUrl(getTapPath(globalConfig, tap))

  // Add the context build ENVs to the command
  dockerCmd = docker.toBuildArgs(buildArgs, dockerCmd, get(containerOpts, 'BUILD_ARGS_FILTER'))

  return reduceObj(containerOpts.ARGS, (key, value, dockerCmd) => {
    let useVal
    switch(key){
      case 'GIT_KEY':{
        useVal = gitKey
        break
      }
      case 'GIT_CLI_URL':{
        useVal = getGitUrl({ globalConfig, repo: 'cli' })
        break
      }
      case 'GIT_APP_URL':{
        useVal = tapUrl
        break
      }
    }

    return exists(useVal) ? docker.asBuildArg(key, useVal, dockerCmd) : dockerCmd

  }, dockerCmd).trim()

}

module.exports = {
  getBuildArgs
}