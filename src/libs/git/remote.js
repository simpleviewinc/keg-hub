const { checkCall } = require('jsutils')
const { gitCli } = require('./commands')
const { NEWLINES_MATCH, WHITESPACE_MATCH } = require('KegConst/patterns')

/**
 * Formats the gitCli response for remotes into a json object
 * @function
 * @param {string} remotes - text response from the gitCli
 *
 * @returns {Array} - Formatted remote objects
 */
const formatRemotes = (remotes='') => {
  const lines = remotes.split(NEWLINES_MATCH)

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
  * @param {string} remotes - text response from the gitCli
  *
  * @returns {Array} - Formatted remote objects
  */
  list = async (url, local, options) => {
    const data = await gitCli({
      opts: [ 'git', 'remote', '-v' ],
      ...options,
    })

    return formatRemotes(data)
  }


}


module.exports = {
  Remote
}