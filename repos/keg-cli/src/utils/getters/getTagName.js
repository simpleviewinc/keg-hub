const { git } = require('KegGitCli')
const { get, isStr, isBool } = require('@keg-hub/jsutils')

/**
 * Gets/builds a tag name based on the passed in arguments
 * @param {Object} args - Default arguments passed to all tasks
 * @param {Object} params - Parse options from the command line
 * @param {string} location - Local location when the tag name could be generated from
 *
 * @returns {*} - Response from the docker pull task
 */
const getTagName = async ({ latest, branch, version, tag, tagVariable }, location) => {
  const explicitTag = latest ? 'latest' : tag || version

  // If the version or tag is defined explicitly, then use it
  if(explicitTag) return explicitTag

  // Get the branch name, either from the passed in value or from the host location
  const branchName = isStr(branch)
    ? branch
    : location && await git.branch.name(location)

  // If branch is true or a string, then use the branch name
  if(branch) return branchName

  // Otherwise, if we have a branch name, check if we should use latest
  const useLatest = branchName && ([`master`, `staging`, `qa`, `develop`])
    .reduce((useLatest, env) => {
      return latest || branchName === env
    }, false)

  // Return latest ||  the branch name if it exists
  return (branchName && useLatest) || !branchName
    ? `latest`
    : branchName

}

module.exports = {
  getTagName
}