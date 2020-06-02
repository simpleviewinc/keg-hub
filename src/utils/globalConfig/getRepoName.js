const { get } = require('jsutils')
const { getGlobalConfig } = require('./getGlobalConfig')

/**
 * Gets the name of the remote git repo
 * @param {string} repoKey - Key to map to the repo name in the globalConfig
 *
 * @returns {string} - Name if the remote git repo
 */
const getRepoName = repoKey => {

  const globalConfig = getGlobalConfig()
  const repos = get(globalConfig, 'cli.git.repos')
  
  // Build all types without keg text due to how the repos are mapped in the globalConfig
  const types = [ repoKey, repoKey.replace('keg', ''), repoKey.replace('keg-', '') ]

  // Loop over the type and loop for a mapped value from the repos object
  return types.reduce((foundRepo, key) => (foundRepo ? foundRepo : repos[key]), undefined)

}

module.exports = {
  getRepoName
}