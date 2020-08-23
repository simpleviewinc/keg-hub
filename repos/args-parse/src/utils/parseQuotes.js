/**
  ------ NOTES ------
  I know this file is a bunch of BS, and hard to read
  Most of this code was lifted from
    https://github.com/substack/node-shell-quote/blob/master/index.js
  I cleaned if up a little bit, but it's still pretty bad
  The upside is that it works
  I couldn't just install the node_module, because we want to handle array and objects
  as cmd line arguments, but the library doesn't handle them
  So I lifted the code and add the checkForObj method
  ------ NOTES ------
*/

const SINGLE_QUOTE = '"((\\\\"|[^"])*?)"'
const DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\''
const BAREWORD = `(\\\\[\'"|&;()<> \\t]|[^\\s\'"|&;()<> \\t])+`
const MATCHER = new RegExp(`(${BAREWORD}|${SINGLE_QUOTE}|${DOUBLE_QUOTE})*`, 'g')

const SQ = "'"
const DQ = '"'
const BS = '\\'

/**
 * Gets the next char in the match, and returns it based on it's quote state
 * @function
 * @param {string} match - string part that matches the MATCHER regex
 *
 * @returns {string} - next char or next char with \\ added to it
 */
const setNextChar = (match, index) => {
  const char = match.charAt(index)
  return char === DQ || char === BS ? char : BS + char
}

/**
 * Checks if the match argument is a stringified object or array
 * @function
 * @param {string} match - string part that matches the MATCHER regex
 *
 * @returns {string|boolean} - False if it's not stringified object or array
 */
const checkForObj = match => {
  const toCheck = match.indexOf('=') !== -1
    ? match.split('=')[1]
    : match

  if(!toCheck) return match

  const isObject = toCheck.indexOf('{') === 0 &&
    toCheck.indexOf('}') === toCheck.length - 1 &&
    toCheck.includes(':')
  
  const isArr = toCheck.indexOf('[') === 0 &&
    toCheck.indexOf(']') === toCheck.length - 1

  return isObject || isArr

}

/**
 * Parses quoted arguments to ensure they are handel correctly durning key value mapping
 * If an argument is object link ( object || array ), it will do nothing
 * @function
 * @example
 * parseQuotes([ '--foo', '"quoted', 'string"' ]) => [ '--foo', 'quoted string' ]
 * @param {Array} args - String arguments to check for quotes
 *
 * @returns {Array} - Passed in args, but with quoted arguments joined together
 */
const parseQuotes = args => {
  args = Array.isArray(args) ? args.join(' ') : args

  const matches = args.match(MATCHER).filter(Boolean)

  if (!matches) return []

  return Array.isArray(matches) &&
    matches.map(match => {
      if(checkForObj(match)) return match

      let quote = false
      let esc = false
      let out = ''

      for (let i = 0, length = match.length; i < length; i++) {
        let char = match.charAt(i)

        esc
          ? (() => {
              out += char
              esc = false
            })()
          : quote
            ? char === quote
              ? (quote = false)
              : quote == SQ
                ? (out += char)
                : char !== BS
                  ? (out += char)
                  : (out += setNextChar(match, i += 1))
            : char === DQ || char === SQ
              ? (quote = char)
              : char === BS
                ? (esc = true)
                : (out += char)
      }

      return out

    })
    .reduce((prev, arg) => arg === undefined ? prev : prev.concat(arg),[])

}


module.exports = {
  parseQuotes
}