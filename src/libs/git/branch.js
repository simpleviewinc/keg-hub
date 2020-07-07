const { mapObj, reduceObj, checkCall } = require('@ltipton/jsutils')
const { gitCli } = require('./commands')
const { isHex } = require('./helpers')
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
  current = async (location=process.cwd(), branches) => {
    branches = branches || await this.list(location)

    return branches && branches.reduce((current, branch) => {
      return !current && branch && branch.current ? branch : current
    }, null)

  }

}


module.exports = {
  Branch,
}