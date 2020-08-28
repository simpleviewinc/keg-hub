const { gitCli, gitCmd } = require('./commands')
const { getLogArgs, getFetchArgs, getCheckoutArgs } = require('./helpers')

class Repo {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  /**
  * Clones a git repo to a local directory
  * @memberof Git
  * @function
  * @param {string} url - Git url to clone
  * @param {string} location - Location to clone to
  * @param {Object} options - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  clone = async (url, local, options, cmdOpts) => {
    return gitCli({
      opts: `clone ${ url } ${ local }`,
      ...options,
    }, cmdOpts)
  }

  /**
  * Checks if location is inside a git repo
  * @memberof Git
  * @function
  * @param {string} location - Location to check
  * @param {Object} options - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  exists = async (location=process.cwd(), options={}, cmdOpts) => {
    const res = await gitCli({
      opts: 'rev-parse --is-inside-work-tree',
      ...options,
    }, cmdOpts, location)

    return Boolean(res)
  }

  name = () => {
    // TODO: Get the name of the current repo from git
    
  }

  /**
  * Logs the past commits for a git repo
  * @memberof Git
  * @function
  * @param {string} params.location - Location to check
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  log = ({ location, env, ...params }, cmdOpts) => {
    cmdOpts = location ? { ...cmdOpts, cwd: location } : cmdOpts

    return gitCmd(`log ${ getLogArgs(params) }`.trim(), cmdOpts)
  }

  /**
  * Fetches branches from a remote
  * @memberof Git
  * @function
  * @param {string} params.location - Location to check
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  fetch = ({ location=process.cwd(), env, log, ...params }, cmdOpts) => {
    cmdOpts = location ? { ...cmdOpts, cwd: location } : cmdOpts

    return gitCmd(`fetch ${ getFetchArgs(params) }`.trim(), cmdOpts, log)
  }

  checkout = ({ location=process.cwd(), env, log, ...params }, cmdOpts) => {
    cmdOpts = location ? { ...cmdOpts, cwd: location } : cmdOpts
    return gitCmd(`checkout ${ getCheckoutArgs(params) }`.trim(), cmdOpts, log)
  }



}


module.exports = {
  Repo
}
