const { isArr } = require('jsutils')
const { getGitUrl, getGitKey } = require('KegUtils')
const { DOCKER } = require('KegConst')
const { BUILD } = DOCKER

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
const getBuildArgs = async (globalConfig, { name, branch, dockerCmd }) => {
  
  const gitKey = await getGitKey(globalConfig)
  dockerCmd = !gitKey
    ? dockerCmd
    : createBuildArg(
        BUILD.ARGS.GIT_KEY,
        gitKey,
        dockerCmd
      )

  const gitUrl = getGitUrl(globalConfig, name, branch)
  dockerCmd = !gitUrl
    ? dockerCmd
    : createBuildArg(
        BUILD.ARGS.GIT_TAP_URL,
        gitUrl,
        dockerCmd
      )

  return dockerCmd

}

module.exports = {
  getBuildArgs
}