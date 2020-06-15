const { Branch } = require('./gitBranch')
const { Repo } = require('./gitRepo')

class Git {

  constructor(options){
    this.branch = new Branch(this, options)
    this.repo = new Repo(this, options)
  }

}

const git = new Git({})

module.exports = {
  Git,
  git
}