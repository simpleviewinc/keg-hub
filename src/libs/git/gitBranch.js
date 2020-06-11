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
 * @param {*} { branches } - Git object response from simple-git module
 *
 * @returns {void}
 */
const gitBranchPrint = ({ branches }) => {
  Logger.header(`GIT BRANCHES`)
  Object.keys(branches).map((key, index) => printBranchIndex(branches[key], index))
  Logger.empty()
}

/**
 * Gets the current branch as an object from the passed in branches
 * @param {*} { branches } - Git object response from simple-git module
 *
 * @returns {Object} - Current branch object
 */
const gitCurrentBranch = ({ branches }) => {
  return reduceObj(branches, (key, value, found) => {
    return !found && value && value.current ? value : found
  }, null)
}

class Branch {

  constructor(git){
    this.git = git
  }

  current = () => {
    return gitCurrentBranch(this.git)
  }

  print = () => {
    return gitBranchPrint(this.git)
  }

}


module.exports = {
  Branch,
  gitBranchPrint,
  gitCurrentBranch,
}