const { checkCall, isStr } = require('jsutils')
const { gitCli } = require('./commands')
const { NEWLINES_MATCH, WHITESPACE_MATCH } = require('KegConst/patterns')

/**
 * Formats the gitCli response for remotes into a json object
 * @function
 * @param {string|Array} remotes - text response from the gitCli
 *
 * @returns {Array} - Formatted remote objects
 */
const formatRemotes = (remotes='') => {
  const lines = isStr(remotes)
    ? remotes.split(NEWLINES_MATCH)
    : remotes

  return lines.reduce((mapped, line) => {
    return !line.trim()
      ? mapped
      : mapped.concat(checkCall(() => {
          const [ name, url ] = line.split(WHITESPACE_MATCH)
          return { name, url }
        }))
  }, [])
}

class Remote {

  constructor(git, options){
    this.git = git
    this.options = options
  }

  /**
  * Formats the gitCli response for remotes into a json object
  * @memberof Remote
  * @function
  * @param {string} location - 
  * @param {object} options
  * @param {object} cmdOpts 
  * 
  * @returns {Promise<Array>} - Formatted remote objects
  */
  list = async (location, options, cmdOpts) => {
    const data = await gitCli({
      opts: [ 'git', 'remote', '-v' ],
      ...options,
    }, cmdOpts, location)

    return formatRemotes(data)
  }


}


module.exports = {
  Remote
}