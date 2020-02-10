const fs = require('fs')
const path = require('path')
const { logData, get } = require('jsutils')
const { validateApp, isDirectory } = require('../helpers')
const { LOG } = process.env

// File path cache, holds the path to a found file, so it doesn't have to look it up again
const FULL_PATH_CACHE = {}

// Tap path cache, holds built alias paths for a tap
const TAP_PATH_CACHE = {}
/**
 * Clears out the path cache when switching to a new tap
 */
const resetFullPathCache = () => {
  Object.keys(FULL_PATH_CACHE)
    .map(key => {
      delete FULL_PATH_CACHE[key]
    })
}

/**
 * Checks if the path is a directory, and if so adds index to it
 * @param {string} aliasPath - path to the alias type
 * @param {string} toLoad - path to file or folder to be loaded
 * @param {string} folderRootFile - Name of file to load when toLoad is a directory
 *
 * @returns {string} - updated file path
 */
const checkAddIndex = (aliasPath, toLoad, folderRootFile) => {
  // Build the path based on the tap alias
  // Example: tap_dir/src/:type/:folderRootFile
  // - w/o extension
  const fullPath = path.join(aliasPath, toLoad)
  return isDirectory(fullPath, true)
    ? path.join(fullPath, folderRootFile)
    : fullPath
}

/**
 * Dynamically load tap files from the taps folder
 * If no file exists, then load from the base tap
 * @param  { string } type - folder to search for file i.e. components/assets
 *
 * @return { string } - path to file
 */
module.exports = (appConfig, aliasMap, content, type) => {

  // Ensure the required app data exists
  validateApp('_', appConfig)

  const nameSpace = get(appConfig, [ 'keg', 'tapResolver', 'aliases', 'nameSpace' ], '')
  const tapName = get(appConfig, [ 'name' ], '').toLowerCase().replace(/ /g, '_')
  const folderRootFile = get(appConfig, [ 'keg', 'tapResolver', 'paths', 'folderRootFile' ], 'index')

  if(!TAP_PATH_CACHE[type]){
    // Check if a tapSrc exists
    const tapSrc = aliasMap[ `${nameSpace}TapSrc` ]
    const typePath = tapSrc && path.join(tapSrc, type)

    // If it does, ensure its a directory
    // Otherwise use the default Tap path
    TAP_PATH_CACHE[type] = typePath && isDirectory(typePath, true)
        ? typePath
        : path.join(aliasMap[ `${nameSpace}Tap` ], type)
  }
  
  return match => {

    // Check if the file has been loaded already
    // If it has, just return the cached path
    const cacheKey = match.join(`-${tapName}-`)
    if (FULL_PATH_CACHE[cacheKey]) {
      LOG && logData(`Loading cached file from ${FULL_PATH_CACHE[cacheKey]}`)
      return FULL_PATH_CACHE[cacheKey]
    }

    // Check if path is a folder, and if folderRootFile should be added to the file path
    // This allows loading the folderRootFile ( index.js ) of a folder, defaults to index.js
    const fullPath = checkAddIndex(TAP_PATH_CACHE[type], match[1], folderRootFile)

    // Check if the file exists without any added extensions
    // Example: tap_dir/assets/platform.sqlite
    let validPath = fs.existsSync(fullPath)

    // Loop the allowed extensions and check if any of the paths + extensions exist at the tap path
    validPath = validPath ||
      content.extensions
        .reduce((hasExt, ext) => {
          // Example: tap_dir/:type/:file_name.js
          // - with extension
          return !hasExt && fs.existsSync(`${fullPath}${ext}`) ? true : hasExt
        }, false)

    // If there is a valid path, use it
    // Otherwise use the default base path
    // Base path - keg_dir/core/base/:type/:file_name.js
    FULL_PATH_CACHE[cacheKey] = validPath
      ? fullPath
      : path.join(content.basePath, type, match[1])

    LOG && logData(`Loading file from ${FULL_PATH_CACHE[cacheKey]}`)

    return FULL_PATH_CACHE[cacheKey]
  }
}
