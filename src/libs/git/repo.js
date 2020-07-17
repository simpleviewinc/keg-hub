const { gitCli, gitCmd } = require('./commands')
const { getLogArgs } = require('./helpers')

class Repo {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  clone = async (url, local, options) => {
    return gitCli({
      opts: `clone ${ url } ${ local }`,
      ...options,
    })
  }

  exists = async (location=process.cwd(), options={}) => {
    const res = await gitCli({
      opts: 'rev-parse --is-inside-work-tree',
      ...options,
    }, {}, location)

    return Boolean(res)
  }

  log = ({ location, ...params }) => {
    const cmdOpts = location ? { cwd: location } : undefined

    return gitCmd(`log ${ getLogArgs(params) }`.trim(), cmdOpts)
  }

}


module.exports = {
  Repo
}