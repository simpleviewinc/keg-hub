const { getGit, gitBranchPrint, getGitPath } = require('KegLibs/git')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { generalError } = require('KegUtils/error')

const branchList = async (args) => {
  const { globalConfig, params, __skipLog } = args
  const { all, context, location } = params

  const gitPath = getGitPath(globalConfig, context) || location

  if(!gitPath) throw new Error(`Git path does not exist for ${ context || location }`)
  
  git = getGit(gitPath)

  const listArgs = [ '--list' ]
  all && listArgs.push('--all')

  // Call cmd to print the branch list
  const [ err, data ] = await git.branch(listArgs)

  // Check if there's an error and throw || print the branch list
  err ? generalError(err.stack) : !__skipLog && gitBranchPrint(data)
  
  return data
}

module.exports = {
  list: {
    name: 'list',
    alias: [ 'ls' ],
    description: 'Prints list of local branch for a git repo',
    action: branchList,
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Name of the repo to show branches of, may also be a linked tap',
        example: 'keg git branch context=core',
      },
      all: {
        description: 'Print all branches for the repo',
        example: 'keg git branch --all',
      },
      location: {
        alias: [ 'loc' ],
        description: `Location when the git branch command will be run`,
        example: 'keg git branch location=<path/to/git/repo>',
        default: process.cwd()
      }
    }
  }
}