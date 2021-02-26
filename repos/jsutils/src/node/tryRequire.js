/** @module command */

const fs = require('fs')

/**
 * Tries to require the path, returning null if unable to.
 * Does not throw.
 * @function
 * @param {string} filePath - path to file. You should use an absolute path
 * @return {*?} the export at path, if it exists, null otherwise
 * @example
 * const module = tryRequire('/keg/tap/foo/bar.js')
 * if (!module) console.log('bar.js module does not exist')
 */
const tryRequire = filePath => {
  try {
    return fs.existsSync(filePath) 
      ? require(filePath)
      : null
  } catch (err) {
    return null
  }
}

module.exports = { tryRequire }