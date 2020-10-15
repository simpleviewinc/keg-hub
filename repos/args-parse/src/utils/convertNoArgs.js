
/**
 * Value to check for when check if value should be falsy
 */
const NO_ARG = `--no-`

/**
 * Loops over the passed in args and checks for the `--no-` prefix
 * <br/>If found it will convert the arg to have false as the value
 * @function
 * @example
 * // The below example shows the parsed args output
 * `['--foo', '--no-bar']` ==> `['--foo', 'bar=false']`
 * @param {Array} args - passed in args to be checked and converted
 *
 * @returns {Array} - args with the --no-* args converted to falsy values
 */
const convertNoArgs = args => {
  return args.map(arg => arg.indexOf(NO_ARG) === 0 ? `${arg.replace(NO_ARG, ``)}=false` : arg)
}


module.exports = {
  convertNoArgs
}