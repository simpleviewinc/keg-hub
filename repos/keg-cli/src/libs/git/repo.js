const { gitCli, gitCmd } = require('./commands')
const { getLogArgs, getFetchArgs, getCheckoutArgs } = require('./helpers')
const { isStr, isBool } = require('@keg-hub/jsutils')
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
  * Fetches all branches from a remote
  * <br/>Then loop over them and setup the remote branch to be tracked by the local branch
  * @memberof Git
  * @function
  * @param {string} params.location - Location to check
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {void}
  */
  fetch = async ({ location=process.cwd(), env, log, ...params }, extraOpts) => {
    const cmdOpts = location ? { ...extraOpts, cwd: location } : extraOpts

    const response = await gitCmd(`fetch ${ getFetchArgs(params) }`.trim(), cmdOpts, log)
    // response is the exit code from the git command
    // So if it is anything other then 0, then there was an error. We just want to return it
    if(response) return response

    // Get the remote branches to setup tracking
    const remoteBranches = await this.git.branch.listRemote(location)

    // Loop over each remote branch and set it up to be tracked by the local branch
    return Promise.all(
      remoteBranches.map(branch => {
        try {
          return gitCli({
            opts: `branch --track ${branch.name} ${branch.remote}/${branch.name}`,
            ...params,
            log: false,
            skipError: true,
          }, cmdOpts)
        }
        // If tracking fails, we don't really care, so just catch an return
        catch(err){ return false }
      })
    )
  }

  checkout = ({ location=process.cwd(), env, log, ...params }, cmdOpts) => {
    cmdOpts = location ? { ...cmdOpts, cwd: location } : cmdOpts
    return gitCmd(`checkout ${ getCheckoutArgs(params) }`.trim(), cmdOpts, log)
  }


  commitHash = async ({location=process.cwd(), rev='-1', pretty=true, ...options}, cmdOpts) => {
    const opts = [ 'log', rev ]
    isStr(pretty)
      ? opts.push(`--pretty=${pretty}`)
      : isBool(pretty) && opts.push(`--pretty=%h`)

    const resp = await gitCli({
      opts,
      ...options,
    }, cmdOpts, location)

    return resp && resp.trim()
  }

}


module.exports = {
  Repo
}
