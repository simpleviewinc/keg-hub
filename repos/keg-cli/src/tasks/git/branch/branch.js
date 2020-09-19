const { throwWrap } = require('KegUtils/error/throwWrap')
const { get, isFunc, isNum, exists } = require('@keg-hub/jsutils')
const { Logger } = require('KegLog')
const { git } = require('KegGitCli')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { generalError } = require('KegUtils/error')
const { ask } = require('@keg-hub/ask-it')

/**
 * Get the branch name based on the branch or the params.remove value
 * @param {string} branches - Local branches for the repo
 * @param {Object} branch - Branch to find ( could be an index )
 * @param {Object} params - Parsed options from the cmd line
 *
 * @returns {string} - Name of found branch
 */
const getBranchName = async (branches, branch, params) => {
  const { remove, list } = params
  // If remove is truthy, check if we should ask for the name/index
  // Otherwise check if branch has a value, if not ask for it
  // Else default to passed in branch
  let useBranch = list && !branch
    ? await ask.input('Please enter the branch name or index')
    : remove
      ? remove === true
        ? await ask.input('Please enter the branch name or index')
        : remove
      : !branch
        ? await ask.input('Please enter the branch name or index')
        : branch
  
  // Check if the useBranch in a numbered index
  // If it is, use it to pull the name from the branch list
  const branchIndex = parseInt(useBranch)
  return isNum(branchIndex) && branches[branchIndex]
    ? branches[branchIndex].name
    : useBranch
}

/**
 * Creates a new Git branch
 * @param {string} newBranch - Name of new branch to create
 * @param {Object} location - Location of the repo for the branches
 * @param {Object} params - Parsed options from the cmd line
 * @param {boolean} log - Should log task information
 *
 * @returns {void}
 */
const createNewBranch = async (newBranch, location, params, log=true) => {
  return git.repo.checkout({ ...params, log: false, branch: newBranch, newBranch, location })
}

/**
 * Git branch task
 * @param {string} branch - Branch to run action on
 * @param {Array} branches - Array of all current branches
 * @param {Object} location - Location of the repo for the branches
 * @param {Object} params - Parsed options from the cmd line
 *
 * @returns {void}
 */
const doBranchAction = async (branch, branches, location, params) => {

  const { remove, list, ...gitParams } = params
  const useBranch = await getBranchName(branches, branch, params)

  Logger.empty()

  ;!exists(useBranch)
    ? generalError(`Git branch task requires a valid branch name or index!\nGot "${ useBranch }" instead!`)
    : remove
      ? await git.branch.delete({ ...gitParams, log: false, branch: useBranch, location })
      : await git.repo.checkout({ ...gitParams, log: false, branch: useBranch, location })

  Logger.empty()

}

/**
 * Git branch task
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const gitBranch = async args => {
  const { params } = args
  const { branch, context, list, new:newBranch, tap, delete:remove, log, ...gitParams } = params

  // Auto call the list task if we reach the gitBranch root task
  const { branches, location, __internal: { switched } } = await runInternalTask(
    'tasks.git.tasks.branch.tasks.list',
    {
      ...args,
      params: {
        tap,
        context,
        log: (list || log || (!branch && !remove && !newBranch)) || false,
        location: params.location,
        ...(branch && !remove && !newBranch && { branch })
      },
      __internal: { ...args.__internal },
  })

  // If already switched branches, just return
  return switched
    ? true
    : newBranch
      ? createNewBranch(newBranch, location, gitParams, gitParams.log)
      : (branch || list || remove) && doBranchAction(branch, branches, location, { list, remove, ...gitParams })

}

module.exports = {
  branch: {
    name: 'branch',
    alias: [ 'br' ],
    action: gitBranch,
    description: `Run git branch commands on a repo.`,
    example: 'keg branch <options>',
    tasks: {
      ...require('./list'),
      ...require('./current'),
      ...require('./reset'),
    },
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
        alias: [ 'path', 'loc' ],
        description: `Location when the git branch command will be run`,
        example: 'keg git branch location=<path/to/git/repo>',
        default: process.cwd()
      },
      tap: {
        description: 'Name of the tap to build a Docker image for',
        example: 'keg git branch --tap visitapps',
      },
      new: {
        description: 'Create a new branch for the context or location',
        example: 'keg git branch --new my-new-branch',
      },
      delete: {
        alias: [ 'del', 'remove', 'rm' ],
        description: 'Delete a branch from the list of branches',
        example: 'keg git branch --delete branch-to-remove',
      },
      force: {
        description: `Force the git fetch action, including pruning local branches`,
        example: 'keg git branch --force',
        default: false
      },
      sub: {
        alias: [ 'submodules', 'modules', 'recurse' ],
        description: `Recursively run a git action on any git submodules`,
        example: 'keg git branch --sub',
        default: false
      },
      list: {
        alias: [ 'ls', 'switch', 'sw' ],
        description: `Prints the current branchs, and asks for a branch to switch to`,
        example: 'keg git branch --list',
      },
      log: {
        alias: [ 'lg' ],
        description: `Logs the git command being run`,
        example: 'keg git branch --log',
      },
    }
  }
}
