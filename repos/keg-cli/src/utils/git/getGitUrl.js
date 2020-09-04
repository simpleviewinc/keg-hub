const { get, isUrl } = require('@keg-hub/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

/**
 * Builds the git url to clone the repo
 * If the name is a url, then uses that, otherwise name is joined of the the org url
 * @param {string} orgUrl - Organization url of a git repository
 * @param {string} name - Name of the git repo || full git repository url
 * @param {string} branch - Branch of the repo to clone (defaults to master)
 *
 * @returns {string} - Built git repo url
 */
const buildGitUrl = (orgUrl, name, branch) => {
  return isUrl(name)
    ? `${ name }${ branch }`
    : `${ orgUrl }/${ name }.git${ branch }`
}

/**
 * Gets the git url for a repo from the globalConfig object
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {string} key - Key name of the path to get
 * @param {string} branch - Branch of the repo to clone (defaults to master)
 *
 * @returns {string} - Found repo url
 */
const getGitUrl = ({ globalConfig, repo, branch, org }) => {

  const { orgUrl, repos } = get(globalConfig, GLOBAL_CONFIG_PATHS.GIT)

  return orgUrl && repos[repo] && buildGitUrl(
    orgUrl,
    repos[repo],
    branch ? `#{branch}` : ''
  )

}

module.exports = {
  getGitUrl
}