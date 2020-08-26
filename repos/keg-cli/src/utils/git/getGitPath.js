const { getRepoPath } = require('../getters/getRepoPath')

/**
 * Get the path to a git repo
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} name - Name of the repo in the global config to get
 *
 * @returns {string} - path to a git repo || the current dir
 */
const getGitPath = (globalConfig, name) => {
  const gitPath = name && getRepoPath(name, globalConfig)

  return gitPath || process.cwd()
}

module.exports = {
  getGitPath
}