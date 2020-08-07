
/**
 * Builds all possible matches for the passed in argument
 * @param {string} long - Long form name of the argument to find
 * @param {string} short - Short form name of the argument to find
 * @param {Array} [alias=[]] - Other names of the argument to find
 *
 * @returns {Array} - All possible argument names
 */
const buildMatchTypes = (long, short, alias=[]) => {
  return alias.reduce((matchTypes, type) => {
    return matchTypes.concat([ type, `--${type}`, `-${type}` ])
  }, [ long, `--${long}`, short, `-${short}` ])
}


module.exports = {
  buildMatchTypes
}
