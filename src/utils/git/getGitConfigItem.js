const { executeCmd } = require('KegProc')
const { generalError } = require('../error/generalError')

/**
 * Gets a value from the local git config based on passed in key
 * @param {string} Key - Key of the value to get from the local git config
 *
 * @returns {string} - Value of the passed in key
 */
const getGitConfigItem = async key => {
  const { err, data, exitCode } = key
    ? await executeCmd(`git config ${ key }`)
    : generalError(`The "getGitConfigItem" method requires a key as the first argument`)

  return err || exitCode > 0
    ? generalError(err || `Failed to get git config value for key "${ key }"`)
    : (data || '').trim()
}


module.exports = {
  getGitConfigItem
}