const { getGit, gitCurrentBranch, getGitPath } = require('KegLibs/git')
const { Logger } = require('KegLog')
const { throwNoGitBranch } = require('KegUtils/error/throwNoGitBranch')
const { DOCKER } = require('KegConst/docker')

const logBranch = branch => {
  Logger.empty()
  Logger.message(`Current Branch:`, branch)
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
const currentBranch = async args => {

  const { params,  globalConfig, __skipLog } = args
  const { context, path: repoPath } = params

  // Get the path to the repo
  const gitPath = context && getGitPath(globalConfig, context) || repoPath

  // Ensure a repo path could be found
  !gitPath && throwNoGitBranch(context || repoPath)

  // Initialize git
  const git = getGit(gitPath)
  
  // Get all the branches for the location
  const [ err, branchData ] = await git.branch([ '--list', '--all'])

  // Throw or get the current branch
  err && generalError(err.stack)

  // If no current branch, then throw error
  // Otherwise log the current branch
  !branchData.current
    ? generalError(`Could not get the current branch for ${ context || repoPath }`)
    : !__skipLog && logBranch(branchData.current)

  // Get the current branch as an object
  const branchObj = gitCurrentBranch(branchData)

  // Return the current branch as an object
  return branchObj || { name: branchData.current, current: true }

}

module.exports = {
  current: {
    name: 'current',
    alias: [ 'cur', 'cr', 'active' ],
    action: currentBranch,
    description: `Get the current git branch from a path`,
    example: 'keg branch current <options>',
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Name or context to get the current branch from',
        enforce: true
      },
      path: {
        description: 'Full path location of a repository to get the current branch from',
        enforce: true
      }
    }
  }
}