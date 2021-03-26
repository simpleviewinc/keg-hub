const fs = require('fs')
const path = require('path')
const tapConstants = require('../tap/tapConstants')
const { isDirectory, ensureDirSync } = require('../helpers')
const {
  get,
  isStr,
  isEmptyColl,
  cleanStr,
  styleCase,
  noOpObj,
  noPropArr
} = require('@keg-hub/jsutils')

/**
 * Warning for auto-generated files so users know not to modify it
 */
const autoGeneratedText = `
// ********************************* WARNING *********************************
// This is an Auto-Generated file. Do NOT modify, changes WILL be overwritten!
// ********************************* WARNING *********************************
`

/**
 * Gets all the asset files names from the passed in tapAssetPath
 * @param {string} tapAssetPath - path to the taps assets folder
 * @param {Array} extensions - Allowed asset extensions
 *
 * @returns {Array} - all assets found for the passed in tap
 */
const assetFileNames = (tapAssetPath, extensions = []) => {
  // Get all allowed extensions
  const allExtensions = get(tapConstants, [ 'extensions', 'assets' ], noPropArr).concat(
    extensions
  )

  // Create an Array from the assets found at the tapAssetPath
  return Array.from(
    // Use Set to ensure all files are unique
    new Set(
      // Read all the files from the passed in path
      fs
        .readdirSync(tapAssetPath)
        // Filter out any that don't match the allowed asset extensions
        .filter(
          file => allExtensions.indexOf(`.${path.basename(file).split('.').pop()}`) !== -1
        )
    )
  )
}

/**
 * Gets the assets path defined in the app config, or from the base path
 * @param {Object} tapAssets - Path to the assets folder for the tap
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} TAP_PATH - path to the taps folder
 *
 * @returns {string} - path to the assets folder
 */
const getAssetsPath = (tapAssets, BASE_PATH, TAP_PATH) => {
  const { assetsPath } = tapConstants

  // Build the default assets path, and ensure it exists
  const defAssetsPath = path.join(BASE_PATH, assetsPath)
  ensureDirSync(defAssetsPath)

  // Build the path relative to the tap
  const checkTapAssetPath = isStr(tapAssets) && path.join(TAP_PATH, tapAssets)

  // Check that the path exists, and is a directory
  return checkTapAssetPath && isDirectory(checkTapAssetPath, true)
    ? { full: checkTapAssetPath, relative: tapAssets }
    : { full: defAssetsPath, relative: assetsPath }
}

/**
 * Checks if a file has the .js extention, and adds it if needed
 * @param {string} file - File name to check for the .js extention
 *
 * @returns {string} - file with the .js exention added
 */
const ensureJsExt = file => (file.includes('.js') ? file : `${file}.js`)

/**
 * Write the assets and font imports to a valid javscript file
 * @param {string} tapAssetPath - Path to the taps asset folder
 * @param {string} assetIndex - Name of the assets index file
 * @param {string} fontsIndex - Name of the fonts index file
 * @param {string} builtAssets - auto-generated imports of asset files as string
 * @param {Array} assetNames - auto-generated names of all the builtAssets
 * @param {string} builtFonts - Assets with a font extention not included in assetNames
 * @param {Array} fontNames - auto-generated names of all the builtFonts
 *
 * @returns {void}
 */
const writeAssetFiles = args => {
  const {
    assetIndex,
    fontsIndex,
    tapAssetPath,
    builtAssets,
    assetNames,
    builtFonts,
    fontNames
 } = args

  // Write the assets index file to the assets/index location
  assetNames.length &&
    fs.writeFileSync(
      path.join(tapAssetPath, ensureJsExt(assetIndex)),
      autoGeneratedText
        .concat(`\n${builtAssets}\n\nexport {\n${assetNames.join(',\n')}\n}`)
    )

  // Write the fonts file to the assets/fonts location
  fontNames.length &&
    fs.writeFileSync(
      path.join(tapAssetPath, ensureJsExt(fontsIndex)),
      autoGeneratedText
        .concat(`\n${builtFonts}\n\nexport {\n${fontNames.join(',\n')}\n}`)
    )
}

/**
 * Generates a tap image and font cache files, which allows loading tap specific images
 * Allows dynamically loading images and fonts without direct imports
 * @param {Object} appConfig - app.json config file
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} TAP_PATH - path to the taps folder
 *
 * @returns {Object} - relative path to taps assets
 */
module.exports = (appConf, BASE_PATH, TAP_PATH) => {

  const resolverConf = get(appConf, [ 'keg', 'tapResolver'], noOpObj)
  const pathsConfig = resolverConf.paths || noOpObj
  const extConfig = resolverConf.extensions || noOpObj

  // Get the font exitentions by joining the default with the extention config
  const fontExts = get(tapConstants, [ 'extensions', 'fonts' ], noPropArr)
    .concat(extConfig.fonts || noPropArr)

  // Get the assets path
  const { full: tapAssetPath, relative } = getAssetsPath(
    // tap assets defined path from the app config
    pathsConfig.tapAssets,
    BASE_PATH,
    TAP_PATH
  )

  // Gets all the images assets in the taps assets folder
  const assetNames = []
  const fontNames = []
  const builtFonts = []
  let builtAssets = assetFileNames(
    tapAssetPath,
    extConfig.assets || noPropArr
  )
    .reduce((builtAssets, name) => {
      // Get the asset name, and add it to the assetNames array
      const [ rawName, ...ext ] = path.basename(name).split('.')
      const assetName = styleCase(cleanStr(rawName))
      const requireText = `const ${assetName} = require('${tapAssetPath}/${name}')`

      // Check if the asset is a font
      // And from that get the correct array to add the asset data to
      const [ namesArr, builtArr ] = fontExts.includes(`.${ext.join('.')}`)
        ? [ fontNames, builtFonts ]
        : [ assetNames, builtAssets ]

        // Add the name of the asset, and the requireText
        namesArr.push(`  ${assetName}`)
        builtArr.push(requireText)

      return builtAssets
    }, [])

  // Write the assets and font imports to a valid javascript file 
  ;(assetNames.length || fontNames.length) &&
    writeAssetFiles({
      fontNames,
      assetNames,
      tapAssetPath,
      builtFonts: builtFonts.join('\n'),
      builtAssets: builtAssets.join('\n'),
      fontsIndex: pathsConfig.fontIndex || tapConstants.fontIndex,
      assetIndex: pathsConfig.folderRootFile || tapConstants.assetsIndex,
    })

  // Return the relative path so it can work with the aliases which are also relative
  return relative
}
