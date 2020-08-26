const { limbo, isFunc, reduceObj } = require('@svkeg/jsutils')

/**
 * Converts all convert functions into a limbo function from @svkeg/jsutils
 * @param {Object} obj - object to add limbo to child functions
 *
 * @returns {Object} - Object with all functions wrapped with limbo
 */
const limboify = obj => {
  return reduceObj(obj, (key, val, updated) => {
    if(!isFunc(val)) return updated

    function withLimbo(...args){ return limbo(val.apply(obj, args)) }
    updated[key] = withLimbo.bind(obj)

    return updated
  }, {})
}

module.exports = {
  limboify
}