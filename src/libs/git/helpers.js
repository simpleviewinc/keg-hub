const { checkCall, reduceObj, isStr } = require('@ltipton/jsutils')
const { NEWLINES_MATCH, WHITESPACE_MATCH } = require('KegConst/patterns')

/**
* Extra git log arguments map. Maps passed in arguments to the real value
* @Object
*
*/
const gitLogArgs = {
  abbrev: 'abbrev-commit',
  pretty: 'pretty=oneline',
}

/**
* Finds the arguments that should be passed to the git log command
* @function
* @param {Object} params - Parsed params passed from the command line
*
* @returns {string} - Built argument string
*/
const getLogArgs = params => {
  return reduceObj(params, (key, value, joined) => {
    return !value
      ? joined
      : gitLogArgs[key]
        ? `${joined} --${gitLogArgs[key]}`
        : `${joined} --${key}`

  }, '').trim()
}


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

module.exports = {
  formatRemotes,
  getLogArgs,
}