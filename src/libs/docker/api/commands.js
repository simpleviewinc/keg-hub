const { dockerCmd, noItemError } = require('./helpers')


/**
 * Calls the docker remove command to remove a docker item
 * @function
 * @param {string} toRemove - Name or id of item to remove
 * @param {boolean} force - Should force remove the item
 *
 * @returns {void}
 */
const remove = ({ item, force, skipError, type='' }) => {
  return item
    ? dockerCmd({ 
        asStr: true,
        skipError: skipError,
        opts: `${ type } rm ${ item } ${ force ? '--force' : '' }`.trim()
      })
    : noItemError(`docker.remove`)
}

module.exports = {
  remove
}