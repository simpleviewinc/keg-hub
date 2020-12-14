const SINGLE_QUOTE = '"((\\\\"|[^"])*?)"'
const DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\''
const BAREWORD = `(\\\\[\'"|&;()<> \\t]|[^\\s\'"|&;()<> \\t])+`
const MATCHER = new RegExp(`(${BAREWORD}|${SINGLE_QUOTE}|${DOUBLE_QUOTE})*`, 'g')

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
  args = Array.isArray(args) ? args.join(' ') : args
  const matches = args.match(MATCHER).filter(Boolean)

  if (!matches) return []

  return Array.isArray(matches) &&
    matches.map(match => {

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
    .reduce((prev, arg) => arg === undefined ? prev : prev.concat(arg),[])

}


module.exports = {
  parseQuotes
}