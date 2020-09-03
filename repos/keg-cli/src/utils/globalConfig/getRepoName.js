const { get } = require('@keg-hub/jsutils')
const { getGlobalConfig } = require('./getGlobalConfig')
const {git} = require('KegGitCli')
const { getTapPath } = require('./getTapPath')
const { throwNoRepo } = require('../error/throwNoRepo')

/**
 * returns the repo name from your global config
 * @param {object} globalConfig 
 * @param {string} repoKey 
 */
const getKegRepo = (globalConfig, repoKey) => {
  const repos = get(globalConfig, 'cli.git.repos')
  
  // Build all types without keg text due to how the repos are mapped in the globalConfig
  const types = [ repoKey, repoKey.replace('keg', ''), repoKey.replace('keg-', '') ]

  // Loop over the type and loop for a mapped value from the repos object
  return types.reduce((foundRepo, key) => (foundRepo ? foundRepo : repos[key]), undefined)
}

/**
 * returns the tap name from the linked name in your global config
 * @param {object} globalConfig 
 * @param {string} tap 
 */
const getTapRepo = async (globalConfig, tap) => {

  const tapPath = getTapPath(globalConfig, tap)
  const remotes = await git.remote.list(tapPath)

  return remotes && remotes.length
    ? remotes[0].url.split('/').pop().replace('.git', '')
    : throwNoRepo(tap)
}

/**
 * Gets the name of the remote git repo
 * @param {string} repoKey - Key to map to the repo name in the globalConfig
 *
 * @returns {Promise<string>} - Name if the remote git repo
 */
const getRepoName = async (repoKey, tap) => {
  const globalConfig = getGlobalConfig()
  
  return tap 
    ? getTapRepo(globalConfig, tap)
    : getKegRepo(globalConfig, repoKey)
}

module.exports = {
  getRepoName
}