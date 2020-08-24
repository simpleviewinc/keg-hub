const { Logger } = require('KegLog')
const { gitCli } = require('./commands')
const { mapObj, reduceObj, checkCall } = require('@svkeg/jsutils')
const { buildCmdOpts, ensureGitRemote, ensureGitBranch } = require('./helpers')
const { NEWLINES_MATCH, SPACE_MATCH, WHITESPACE_MATCH } = require('KegConst/patterns')

/**
 * Matches any * or - character that does not have a alphanumeric character following it
 * @example
 * * test *data*
 * matches ` *` before `test`, but not ` *` before data
 */
const BULLET_MATCH = /[\s]+(\*|-)(?![a-zA-Z0-9_])/g

/**
 * Matches any array brackets as the start of the test with character between
 * @example
 * [ this/will/match ]
 * this [ will/not/match ]
 */
const BRACKET_MATCH = /^\[.*\]\s/

const defRemotes = [ 'remotes', 'origin', 'upstream' ]

/**
 * Formats the gitCli response test into a json object
 * @function
 * @param {string} branches - text response from the gitCli
 * @param {Array} remotes - array of remote objects containing the name and url
 *
 * @returns {Array} - Found branches formatted into json objects
 */
const formatBranches = (branches, remotes) => {
  const lines = branches.split(NEWLINES_MATCH)
  const remoteNames = defRemotes.concat(remotes.map(remote => remote.name))

  return lines.reduce((mapped, line) => {
    return !line.trim()
      ? mapped
      : mapped.concat([ buildBranch(line, remoteNames) ])
  }, [])

}

/**
 * Formats name of a branch, and adds the remote if it's found
 * @function
 * @param {string} name - Full name of the git branch
 * @param {Array} remoteNames - Names of all removes
 *
 * @returns {Object} - Contains the branch name and remote ( If found )
 */
const buildName = (name, remoteNames=[]) => {
  return !name.includes('/')
    ? { remote: 'origin', name }
    : checkCall(() => {
        // Split based on the back-slash and check for a remote in the name
        return name.split('/')
          .reduce((item, part, index) => {

            // If it's the string remote || remotes, just return the item
            if(!part || (index === 0 && part.indexOf('remote') === 0)) return item

            // If no remote, and the current part is a remote name, set it as the remote
            if(!item.remote && remoteNames.includes(part)) item.remote = part

            // Otherwise add it to the item name
            else item.name = item.name ? `${item.name}/${part}` : part

            return item
          }, {})
        
        return { ...item, name: split.join('/') }

      })
}

/**
 * Runs a git action based on passed in params
 * @function
 * @param {Class} git - Root Git Class object
 * @param {Array} gitCmd - Current git action to run
 * @param {Object} args - Arguments that define the command to run
 * @param {Object} cmdOpts - Options to pass to the spawnCmd
 *
 * @returns {Object} - Response from git cli
 */
const doGitAction = async (git, action, args, cmdOpts) => {

  if(!action) return Logger.error(`Git action is require to run a git command!`)
    
  // Ensure the location is set to run the command
  // Default to the current working directory
  args.location = args.location || process.cwd()
  args.action = action

  const gitCmd = [ 'git', action ]
  const remote = await ensureGitRemote(git, args)
  args.remote = args.remote
  remote && gitCmd.push(remote)

  const pushTo = await ensureGitBranch(git, args)
  gitCmd.push(pushTo)

  return gitCmd(gitCmd, buildCmdOpts(cmdOpts, args))
}

/**
 * Builds the branch object by spliting the passed in line info an object
 * @function
 * @param {string} line - Contains the branch information returned form the gitCli
 * @param {Array} remoteNames - Names of all removes
 *
 * @returns {Object} - Formatted branch object
 */
const buildBranch = (line, remoteNames) => {
  const branch = {}
  const [ current, name, commit, ...text ] = line.split(WHITESPACE_MATCH)

  return {
    commit,
    ...buildName(name, remoteNames),
    current: Boolean(current),
    message: line.split(commit)[1].trim()
      // Put bullet points on their own line
      .replace(BULLET_MATCH, match => `\n ${ match }`)
      // Put remote description on their own line
      .replace(BRACKET_MATCH, match => `${ match.trim() }\n`),
      
  }

}

class Branch {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  /**
  * Gets all git branches for the passed in location
  * @memberof Branch
  * @param {string} location - Location where the git command should be run
  *
  * @returns {Array} - All git branches
  */
  list = async (location=process.cwd(), options) => {
    const branches = await gitCli({
      opts: [ 'git', 'branch', '-vv', '--no-color', '--no-abbrev' ],
      ...options,
    }, {}, location)

    const remotes = await this.git.remote.list(location, options)
    return formatBranches(branches, remotes)
  }

  /**
  * Gets the current branch as an object from the passed in branches
  * @memberof Branch
  * @param {Array} { branches } - Git object response from git CLI module
  *
  * @returns {Object} - Current branch object
  */
  current = async ({ location=process.cwd(), branches }) => {
    branches = branches || await this.list(location)

    return branches && branches.reduce((current, branch) => {
      return !current && branch && branch.current ? branch : current
    }, null)

  }

  /**
  * Gets the name of the current branch
  * @memberof Branch
  * @param {Array} { location } - Location of the git repo to get the branch name from
  *
  * @returns {string} - Name of current branch
  */
  name = async ({ location=process.cwd() }) => {
    const current = await this.current(location)
    return current && current.name
  }

  /**
  * Pushes the current branch to a remove
  * @memberof Branch
  * @param {string} [args.remote="origin"] - Name of the remote
  * @param {boolean} args.force - Should force push to the remove
  * @param {string} args.location - Local location where the repo exists
  *
  * @returns {Object} - Current branch object
  */
  checkout = (args, cmdOpts={}) => {
    return doGitAction(this.git, `checkout`, args, cmdOpts)
  }

  /**
  * Pushes the current branch to a remove
  * @memberof Branch
  * @param {string} [args.remote="origin"] - Name of the remote
  * @param {boolean} args.force - Should force push to the remove
  * @param {string} args.location - Local location where the repo exists
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {Object} - Current branch object
  */
  push = (args, cmdOpts={}) => {
    return doGitAction(this.git, `push`, args, cmdOpts)
  }

  /**
  * Pull branches from a remote
  * @memberof Branch
  * @param {string} [args.remote="origin"] - Name of the remote
  * @param {string} args.location - Local location where the repo exists
  * @param {Object} cmdOpts - Options to pass to the spawnCmd
  *
  * @returns {Object} - Current branch object
  */
  pull = (args, cmdOpts={}) => {
    return doGitAction(this.git, `pull`, args, cmdOpts)
  }

}


module.exports = {
  Branch,
}