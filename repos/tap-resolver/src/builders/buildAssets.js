const fs = require('fs')
const path = require('path')
const { get, isStr } = require('jsutils')
const { isDirectory, ensureDirSync } = require('../helpers')
const tapConstants = require('../tap/tapConstants')

/**
 * Gets all the asset files names from the passed in tapAssetPath
 * @param {string} tapAssetPath - path to the taps assets folder
 * @param {Array} extensions - Allowed asset extensions
 *
 * @returns {Array} - all assets found for the passed in tap
 */
const assetFileNames = (tapAssetPath, extensions=[]) => {

  // Get all allowed extensions
  const allExtensions = get(tapConstants, [ 'extensions', 'assets' ], []).concat(extensions)

  // Create an Array from the assets found at the tapAssetPath
  return Array.from(
    // Use Set to ensure all files are unique
    new Set(
      // Read all the files from the passed in path
      fs.readdirSync(tapAssetPath)
        // Filter out any that don't match the allowed asset extensions
        .filter(file => allExtensions.indexOf(`.${ file.split('.').pop() }`) !== -1)
    )
  )
}

/**
 * Gets the assets path defined in the app config, or from the base path
 * @param {Object} appConfig - app.json config file
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} TAP_PATH - path to the taps folder
 *
 * @returns {string} - path to the assets folder
 */
const getAssetsPath = (appConf, BASE_PATH, TAP_PATH) => {
  const { assetsPath } = tapConstants

  // Build the default assets path, and ensure it exists
  const defAssetsPath = path.join(BASE_PATH, assetsPath)
  ensureDirSync(defAssetsPath)

  // Get the tap assets defined path from the app config
  const tapAssets = get(appConf, [ 'keg', 'tapResolver', 'paths', 'tapAssets' ])

  // Build the path relative to the tap
  const checkTapAssetPath = isStr(tapAssets) && path.join(TAP_PATH, tapAssets)

  // Check that the path exists, and is a directory
  return checkTapAssetPath && isDirectory(checkTapAssetPath, true)
    ? { full: checkTapAssetPath, relative: tapAssets }
    : { full: defAssetsPath, relative: assetsPath }
}

/**
 * Generates a tap image cache file, which allows loading tap specific images
 * @param {Object} appConfig - app.json config file
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} TAP_PATH - path to the taps folder
 *
 * @returns {Object} - path to taps assets
 */
module.exports = (appConf, BASE_PATH, TAP_PATH) => {
  
  // Get the assets path
  const { full: tapAssetPath, relative } = getAssetsPath(appConf, BASE_PATH, TAP_PATH)

  // Gets all the images assets in the taps assets folder
  const assetNames = []
  let properties = assetFileNames(
    tapAssetPath,
    get(appConf, [ 'keg', 'tapResolver', 'extensions', 'assets' ], [])
  )
    .map(name => {
      // Get the asset name, and add it to the assetNames array
      const assetName = name.split('.').shift()
      // Add to the asset names with space in front for formatting
      assetNames.push(`  ${assetName}`)
      
      // Return the require statement
      return `const ${assetName} = require('${tapAssetPath}/${name}')`
    })
    .join(',\n')
  
  const exportStr = `${properties}\n\nexport {\n${assetNames}\n}`
  // Ass the assets content to the assets object
  // const string = `const assets = {\n  ${properties}\n}\n\nexport assets`

  // Build the location to save the assets
  const assetsPath = `${tapAssetPath}/index.js`
 
  // Write the file to the assets location
  fs.writeFileSync(assetsPath, exportStr, 'utf8')

  // Return the relative path so it can work with the aliases which are also relative
  return relative
}
