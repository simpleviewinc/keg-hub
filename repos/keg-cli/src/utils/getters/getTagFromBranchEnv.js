const { ENV_MAP } = require('KegConst/constants')

/**
 * Gets the env to use as an image tag based on the branchName
 * <br/> Checks if the passed in branch is equal to an environment key ( develop, staging, qa, prod ... )
 * @param {string} branchName - Name of a current branch
 *
 * @returns {string|boolean} - Matching environment key or false
 */
const getTagFromBranchEnv = branchName => {
  return branchName && Object.keys(ENV_MAP)
    .reduce((envTag, envKey) => {
      return !envTag && ENV_MAP[envKey].includes(branchName)
        ? envKey.toLowerCase()
        : envTag
    }, false)
}

module.exports = {
  getTagFromBranchEnv
}