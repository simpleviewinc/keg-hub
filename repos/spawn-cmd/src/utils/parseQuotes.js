const { isArr, isStr } = require('@keg-hub/jsutils')

const SINGLE_QUOTE = '"((\\\\"|[^"])*?)"'
const DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\''
const BARE_WORD = `(\\\\[\'"|&;()<> \\t]|[^\\s\'"|&;()<> \\t])+`
const MATCHER = new RegExp(`(${BARE_WORD}|${SINGLE_QUOTE}|${DOUBLE_QUOTE})*`, 'g')

const SQ = "'"
const DQ = '"'

/**
 * Parses quoted arguments to ensure they are handel as a single argument
 * Allows passing a single argument by putting quotes around it
 * @function
 * @example
 * parseQuotes([ '"quoted', 'string"' ]) => [ 'quoted string' ]
 * @param {Array} args - String arguments to check for quotes
 *
 * @returns {Array} - Passed in args, but with quoted arguments joined together
 */
const parseQuotes = args => {
  const argsStr = Array.isArray(args) ? args.join(' ') : args

  // If we don't have a string, just return an empty array
  if(!isStr(argsStr)) return []
  
  const matches = argsStr.match(MATCHER).filter(Boolean)

  return !matches || !isArr(matches)
    ? args
    : matches.map(match => {
        let quote = false
        let out = ''

        for (let i = 0, length = match.length; i < length; i++) {
          let char = match.charAt(i)

          quote
            ? char === quote
              ? (quote = false)
              : (out += char)
            : char === DQ || char === SQ
              ? (quote = char)
              : (out += char)
        }

        return out

      })
      .reduce((prev, arg) => arg === undefined ? prev : prev.concat(arg), [])

}


module.exports = {
  parseQuotes
}