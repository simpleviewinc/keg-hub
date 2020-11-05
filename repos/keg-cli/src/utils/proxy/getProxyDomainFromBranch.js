const { git } = require('KegGitCli')
const { get } = require('@keg-hub/jsutils')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')

/**
 * Builds name for the proxy config to create a unique name based on the app and it current git branch
 * @function
 * @param {Object} contextName - Name of the service to build the proxy domain for
 * @param {Object} contextPath - Path of the service on the host machine, to allow getting the current branch
 *
 * @returns {Object} - Name to use for the proxy config labels
 */
const getProxyDomainFromBranch = async (contextName, contextPath) => {
  // Get the branch name of the application based on the buildContextPath
  // buildContextPath should be the root of the application being built
  // I.E. keg-hub/taps/<tap-name> || keg-hub/repos/<repo-name> ( internal applications )
  const currentBranch = await git.branch.current({
    location: contextPath,
  })

  const branchName = get(currentBranch, 'name') 

  // Can't build the domain without a branch, so throw an error.
  // This means a git repo is required!
  !branchName && throwNoGitBranch(contextPath)

  // If we have a branch name, join it with the app name and return
  return `${contextName}-${branchName}`

}

module.exports = {
  getProxyDomainFromBranch
}