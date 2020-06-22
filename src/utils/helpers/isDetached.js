const { isStr } = require('jsutils')

/**
 * Checks if a process should run in detached mode
 * @function
 * @param {string} validate - Item to check the detached argument against
 * @param {string} detached - Detached state to check against
 * @param {string} attach - Detached state to check against
 *
 * @returns {boolean} - If a process should be run in detached mode
 */
const isDetached = (validate='', attached) => (
  attached !== validate
)

module.exports = {
  isDetached
}