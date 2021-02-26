/** @module command */

const fs = require('fs')

/**
 * Tries to synchronously require the path, returning null if unable to.
 * Does not throw.
 * @function
 * @param {string} filePath - path to file. You should use an absolute path
 * @return {*?} the export at path, if it exists, null otherwise
 * @example
 * const module = tryRequireSync('/keg/tap/foo/bar.js')
 * if (!module) console.log('bar.js module does not exist')
 */
const tryRequireSync = filePath => {
  try {
    return fs.existsSync(filePath) 
      ? require(filePath)
      : null
  } catch (err) {
    return null
  }
}

/**
 * Tries to asynchronously require the path, returning null if unable to.
 * Does not throw.
 * @function
 * @param {string} filePath - path to file. You should use an absolute path
 * @return {Promise<*?>} the export at path, if it exists, null otherwise
 * @example
 * const module = await tryRequire('/keg/tap/foo/bar.js')
 * if (!module) console.log('bar.js module does not exist')
 */
const tryRequire = filePath => {
  return new Promise(resolve => {
    fs.access(filePath, err => {
      if (err) return resolve(null)
      try {
        const module = require(filePath)
        return resolve(module)
      }
      catch (err) {
        return resolve(null)
      }
    })
  })
}


module.exports = { tryRequire, tryRequireSync }