const { getGit } = require('./getGit')
const { Branch, gitCurrentBranch, gitBranchPrint } = require('./gitBranch')
const { gitClone, Repo } = require('./gitRepo')



class Git {

  constructor(repoPath, globalConfig, options){
    this.local = repoPath
    this.git = getGit(repoPath, globalConfig, options)
    this.branch = new Branch(this.git)
    this.repo = new Repo(this.git)
  }

}

module.exports = {
  Git
}