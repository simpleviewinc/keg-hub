
const gitClone = ({ clone }, url, local, options) => {
  return clone(url, local, options)
}

class Repo {

  constructor(git){
    this.git = git
  }

  clone = (url, local, options) => {
    return gitClone(this.git, url, local, options)
  }

  exists = () => {
    return this.git.checkIsRepo()
  }

}


module.exports = {
  gitClone,
  Repo
}