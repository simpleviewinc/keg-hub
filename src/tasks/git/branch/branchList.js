const { getGit, gitBranchPrint, getGitPath } = require('KegLibs/git')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { generalError } = require('KegUtils/error')

const branchList = async (globalConfig, name) => {

  const gitPath = getGitPath(globalConfig, name)
  if(!gitPath) throw new Error(`Git path does not exist for ${name}`)
  
  git = getGit(gitPath)

  const [ err, data ] = await git.branch([ '--list', '--all'])
  err ? generalError(err.stack) : gitBranchPrint(data)
}


module.exports = {
  branchList
}