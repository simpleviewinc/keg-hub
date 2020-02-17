const ncp = require('ncp')
const rimraf = require('rimraf')
const fs = require('fs')

/**
 * Same as cp -R from the command line
 * @param {string} src - The path to copy
 * @param {string} dest - The path to the new copy
 */
const copy = (src, dest) => ncp(
  src,
  dest,
  err => err && console.error(err)
)

/**
 * Same as cp -R from the command line
 * @param {string} toRemove - The path to remove
 */
const remove = toRemove => toRemove &&
  fs.existsSync(toRemove) &&
  rimraf(toRemove, err => err && console.error(err.message))

module.exports = {
  copy,
  remove
}