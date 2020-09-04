const { Logger } = require('KegLog')
const { mapObj, reduceObj } = require('@keg-hub/jsutils')

/**
 * Prints a formatted git branch with index
 * @param {*} branch - Git branch to be printed
 * @param {*} index - Index of the branch
 *
 * @returns {void}
 */
const printBranchIndex = (branch, index) => {
  const remote = branch.remote && branch.remote !== 'origin'
    ? branch.remote + '/'
    : ''

  Logger.print(
    branch.current ? ` 🌟` : `   `,
    Logger.color('data', index),
    Logger.color('blue', ' => '),
    Logger.color('data', `${ remote }${ branch.name }`)
  )
}

/**
 * Prints all passed in git branches
 * @param {Object} branches - Git object response from git Cli module
 *
 * @returns {void}
 */
const printGitBranches = (branches=[]) => {
  Logger.header(`GIT BRANCHES`)
  branches.map((branch, index) => printBranchIndex(branch, index))
  Logger.empty()
}

module.exports = {
  printGitBranches
}