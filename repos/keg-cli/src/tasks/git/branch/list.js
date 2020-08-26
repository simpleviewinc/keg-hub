const { getGitPath } = require('KegUtils/git/getGitPath')
const { printGitBranches } = require('KegUtils/git/printGitBranches')
const { generalError } = require('KegUtils/error')
const { git } = require('KegGitCli')

const branchList = async (args) => {
  const { globalConfig, params, __skipLog } = args
  const { all, context, location } = params

  const gitPath = getGitPath(globalConfig, context) || location

  if(!gitPath) throw new Error(`Git path does not exist for ${ context || location }`)

  const branches = await git.branch.list(gitPath)

  // Check if we should print the branch list
  !__skipLog && printGitBranches(branches)
  
  return branches
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