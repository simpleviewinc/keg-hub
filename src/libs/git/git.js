const { Branch } = require('./branch')
const { Repo } = require('./repo')
const { Remote } = require('./remote')

class Git {

  constructor(options){
    this.branch = new Branch(this, options)
    this.repo = new Repo(this, options)
    this.remote = new Remote(this, options)
  }

}

const git = new Git({})

module.exports = {
  Git,
  git
}