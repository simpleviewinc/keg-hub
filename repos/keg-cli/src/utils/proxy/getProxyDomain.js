const { git } = require('KegGitCli')
const { get } = require('@keg-hub/jsutils')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')
/**
 * Builds name for the proxy config to create a unique name based on the app and it current git branch
 * @function
 * @param {Object} data - Data to fill the compose template with
 * @param {Object} composeContext - Already build composeContext data
 *
 * @returns {Object} - Name to use for the proxy config labels
 */
const getProxyDomain = async (data, composeContext) => {
  // Get the name of the tap or use the context for internal applications
  const appName = get(
    data, `params.__injected.tap`,
    get(data, `params.tap`,
      get(data, `params.__injected.context`,
        get(data, `params.context`, composeContext.image || composeContext.container)
      )
    )
  )

  // Get the branch name of the application based on the buildContextPath
  // buildContextPath should be the root of the application being built
  // I.E. keg-hub/taps/<tap-name> || keg-hub/repos/<repo-name> ( internal applications )
  const currentBranch = await git.branch.current({
    location: composeContext.buildContextPath
  })

  const branchName = get(currentBranch, 'name') 
  // If we have a branch name, join it with the app name and return
  // Otherwise throw an error. This means a git repo is required!
  return branchName
    ? `${appName}-${branchName}`
    : throwNoGitBranch(composeContext.buildContextPath)

}

module.exports = {
  getProxyDomain
}