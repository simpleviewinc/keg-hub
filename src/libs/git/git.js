const { Branch } = require('./gitBranch')
const { Repo } = require('./gitRepo')

class Git {

  constructor(options){
    this.branch = new Branch(this, options)
    this.repo = new Repo(this, options)
  }

}

module.exports = {
  Git
}