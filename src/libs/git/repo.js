const { gitCli } = require('./commands')

class Repo {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  clone = async (url, local, options) => {
    return gitCli({
      opts: [ 'git', 'clone', url, local ],
      ...options,
    })
  }

  exists = async (location=process.cwd(), options={}) => {
    const res = await gitCli({
      opts: [ 'git', 'rev-parse', '--is-inside-work-tree' ],
      ...options,
    }, {}, location)

    return Boolean(res)
  }

}


module.exports = {
  Repo
}