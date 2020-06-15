const { Logger } = require('KegLog')
const { mapObj, reduceObj } = require('jsutils')

/**
 * Prints a formated git branch with index
 * @param {*} branch - Git branch to be printed
 * @param {*} index - Index of the branch
 *
 * @returns {void}
 */
const printBranchIndex = (branch, index) => {
  Logger.print(
    branch.current ? ` 🌟` : `   `,
    Logger.color('data', index),
    Logger.color('blue', ' => '),
    Logger.color('data', branch.name)
  )
}

/**
 * Prints all passed in git branches
 * @param {Object} branches - Git object response from simple-git module
 *
 * @returns {void}
 */
const printGitBranches = (branches={}) => {
  Logger.header(`GIT BRANCHES`)
  Object.keys(branches).map((key, index) => printBranchIndex(branches[key], index))
  Logger.empty()
}

module.exports = {
  printGitBranches
}