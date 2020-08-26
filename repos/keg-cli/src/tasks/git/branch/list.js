const { ask } = require('@svkeg/ask-it')
const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { isNum, exists } = require('@svkeg/jsutils')
const { getGitPath } = require('KegUtils/git/getGitPath')
const { printGitBranches } = require('KegUtils/git/printGitBranches')
const { generalError } = require('KegUtils/error')


/**
 * Checks for a matching branch name based on the passed in branch
 * @param {string} branch - Name of branch to match
 * @param {Array} branches - All local branches for the repo
 *
 * @returns {void}
 */
const getBranchByName = (branch, branches) => {
  return branches.reduce((found, bran) => {
    return found || bran.name !== branch
      ? found
      : bran.name
  }, false)
}

/**
 * Git branch list task. Also allows switching branches
 * @param {string} branch - Branch to run action on
 * @param {Array} branches - Array of all current branches
 * @param {Object} location - Location of the repo for the branches
 * @param {Object} params - Parsed options from the cmd line
 *
 * @returns {void}
 */
const branchList = async (args) => {
  const { globalConfig, params, __internal={} } = args
  const { branch, context, location, log, tap } = params
  const { __skipLog } = __internal
  const gitPath = getGitPath(globalConfig, tap || context) || location
  !gitPath && generalError(`Git path does not exist for ${ tap || context || location }`)

  const branches = await git.branch.list(gitPath)

  // Check if we should print the branch list
  !__skipLog && log && printGitBranches(branches)

  // If no branch, just return the response
  if(!exists(branch)) return { branches, location: gitPath, __internal: {} }

  // Try to get the branch by name
  const branchName = getBranchByName(branch, branches)

  // If no branch by name, and branch is not true, it should then be an numbered index
  let branchIndex = !branchName && branch !== true && parseInt(branch)

  // If no matching branch name, and no branchIndex, then ask for the branch index
  branchIndex = exists(branchIndex)
    ? branchIndex
    : !branchName && parseInt(await ask.input('Please enter the branch name or index'))

  // We either have a branch index or a branch name so check which one and use it
  const useBranch = isNum(branchIndex) && branches[branchIndex]
    ? branches[branchIndex].name
    : branchName

  // Checkout the found branch
  Logger.empty()
  useBranch
    ? await git.repo.checkout({ branch: useBranch, location, log: exists(__skipLog) ? !__skipLog : log })
    : generalError(`Could not find the git branch from "${ branch }"\nEnsure the branch name or index is correct!`)
  Logger.empty()

  // return with __internal switched true, so we know branches were already switched
  return { branches, location: gitPath, __internal: { switched: true } }

}

module.exports = {
  list: {
    name: 'list',
    alias: [ 'ls' ],
    description: 'Prints list of local branch for a git repo',
    action: branchList,
    options: {
      branch: {
        description: 'Create a new branch for the context or location',
        example: 'keg git branch --branch my-git-branch',
      },
      context: {
        alias: [ 'name' ],
        description: 'Name of the repo to show branches of, may also be a linked tap',
        example: 'keg git branch context=core',
      },
      location: {
        alias: [ 'loc' ],
        description: `Location when the git branch command will be run`,
        example: 'keg git branch location=<path/to/git/repo>',
        default: process.cwd()
      },
      tap: {
        description: 'Name of the tap to build a Docker image for',
        example: 'keg git current --tap visitapps',
      },
      log: {
        alias: [ 'lg' ],
        description: `Logs the git command being run`,
        example: 'keg git branch --log false',
        default: true
      },
    }
  }
}
