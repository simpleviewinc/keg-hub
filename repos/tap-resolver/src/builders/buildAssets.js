const fs = require('fs')
const path = require('path')
const tapConstants = require('../tap/tapConstants')
const { isDirectory, ensureDirSync } = require('../helpers')
const { get, isStr, noOpObj, noPropArr } = require('@keg-hub/jsutils')
/**
 * Warning for auto-generated files so users know not to modify it
 */
const autoGeneratedText = `
// ********************************* WARNING *********************************
// This is an Auto-Generated file. Do NOT modify, changes WILL be overwritten!
// ********************************* WARNING *********************************
`

/**
 * Recursively finds all files within the passed in searchLocation and sub-folders
 * @param {string} searchLocation - Root location to start the search from
 *
 * @returns {Array} - all file and sub-file found at the passed in searchLocation
 */
const getFiles = searchLocation => {
  return fs
    .readdirSync(searchLocation, { withFileTypes: true })
    .reduce((foundFiles, dirent) => {
      const res = path.resolve(searchLocation, dirent.name)
      const subLocations = dirent.isDirectory() ? getFiles(res) : [res]

      return foundFiles.concat(subLocations)
    }, [])
}

/**
 * Gets all the asset files names from the passed in tapAssetPath
 * @param {string} tapAssetPath - path to the taps assets folder
 * @param {Array} extensions - Allowed asset extensions
 *
 * @returns {Array} - all assets found for the passed in tap
 */
const assetFileNames = (assetPath, extensions = noPropArr) => {
  // Create an Array from the assets found at the assetPath
  return Array.from(
    // Use Set to ensure all files are unique
    new Set(
      // Read all the files from the passed in path
      getFiles(assetPath).filter(
        file => extensions.indexOf(path.extname(file)) !== -1
      )
    )
  )
}

/**
 * Gets the assets path defined in the app config, or from the base path
 * @param {Object} pathsConfig - Tap paths config containing the assets and fonts paths
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} TAP_PATH - path to the taps folder
 *
 * @returns {Object} - Containing the Assets and Fonts paths to use
 */
const getAssetsPath = (pathsConfig, BASE_PATH, TAP_PATH) => {
  const { tapAssets, tapFonts } = pathsConfig
  const { assetsPath, fontsPath } = tapConstants

  // Build the default assets path, and ensure it exists
  const defAssetsPath = path.join(BASE_PATH, assetsPath)
  ensureDirSync(defAssetsPath)

  // Build the default fonts path, and ensure it exists
  const defFontsPath = path.join(BASE_PATH, fontsPath)
  ensureDirSync(defFontsPath)

  // Build the assets path relative to the tap
  const checkTapAssetPath = isStr(tapAssets) && path.join(TAP_PATH, tapAssets)

  // Build the fonts path relative to the tap
  const checkTapFontsPath = isStr(tapFonts) && path.join(TAP_PATH, tapFonts)

  // Set the defaults for the assets and fonts paths
  const foundPaths = {
    defAssetsPath,
    defFontsPath,
    fontsFull: defFontsPath,
    assetsFull: defAssetsPath,
    fontsRelative: fontsPath,
    assetsRelative: assetsPath,
  }

  // If the assets path exists, update the foundPaths with the taps asset paths
  checkTapAssetPath &&
    isDirectory(checkTapAssetPath, true) &&
    Object.assign(foundPaths, {
      assetsRelative: tapAssets,
      assetsFull: checkTapAssetPath,
    })

  // If the fonts path exists, update the foundPaths with the taps fonts paths
  checkTapFontsPath &&
    isDirectory(checkTapFontsPath, true) &&
    Object.assign(foundPaths, {
      fontsRelative: tapFonts,
      fontsFull: checkTapFontsPath,
    })

  return foundPaths
}

/**
 * Checks if a file has the .js extension, and adds it if needed
 * @param {string} file - File name to check for the .js extension
 *
 * @returns {string} - file with the .js extension added
 */
const ensureJsExt = file => (path.extname(file) === '.js' ? file : `${file}.js`)

/**
 * Write the assets and font imports to a valid javascript file
 * @param {string} assetsFull - Path to the taps asset folder
 * @param {string} fontsFull - Path to the taps fonts folder
 * @param {string} assetIndex - Name of the assets index file
 * @param {string} fontsIndex - Name of the fonts index file
 * @param {string} builtAssets - auto-generated imports of asset files as string
 * @param {string} builtFonts - Assets with a font extension
 *
 * @returns {void}
 */
const writeAssetFiles = args => {
  const {
    assetIndex,
    fontsIndex,
    assetsPath,
    fontsPath,
    builtAssets,
    builtFonts,
  } = args

  // Write the assets index file to the assets/index location
  fs.writeFileSync(
    path.join(assetsPath, ensureJsExt(assetIndex)),
    autoGeneratedText.concat(
      `\nexport const assets = {\n${builtAssets.join(',\n')}\n}\n`
    )
  )

  // Write the fonts file to the assets/fonts location
  fs.writeFileSync(
    path.join(fontsPath, ensureJsExt(fontsIndex)),
    autoGeneratedText.concat(
      `\nexport const fonts = {\n${builtFonts.join(',\n')}\n}\n`
    )
  )
}

/**
 * Validates that a file path does not contain spaces
 * React-Native does not allow assets or fonts in the path name
 * @param {string} assetName - Name of the asset to check
 *
 * @returns {string} - Passed in assetName if it does not contain spaces
 */
const validateNoSpace = assetName => {
  if (!assetName.includes(' ')) return assetName

  throw new Error(
    `React Native does not allow loading assets with white space in their name.\n`,
    `Please rename the asset ${assetName} so that is does not include white space!`
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
  const resolverConf = get(appConf, [ 'keg', 'tapResolver' ], noOpObj)
  const pathsConfig = resolverConf.paths || noOpObj
  const extConfig = resolverConf.extensions || noOpObj

  // Get all allowed asset extensions
  const assetExts = get(
    tapConstants,
    [ 'extensions', 'assets' ],
    noPropArr
  ).concat(extConfig.assets || noPropArr)

  // Get the font extensions by joining the default with the extension config
  const fontExts = get(tapConstants, [ 'extensions', 'fonts' ], noPropArr).concat(
    extConfig.fonts || noPropArr
  )

  // Get the assets path
  const {
    defFontsPath,
    defAssetsPath,
    assetsFull,
    assetsRelative,
    fontsFull,
    fontsRelative,
  } = getAssetsPath(
    // tap assets defined path from the app config
    pathsConfig,
    BASE_PATH,
    TAP_PATH
  )

  // Gets all the image and font assets in the taps assets folder
  const builtFonts = []
  const builtAssets = assetFileNames(assetsFull, assetExts)
    .concat(assetFileNames(fontsFull, fontExts))
    .reduce((builtAssets, filename) => {
      // Get the asset name, and add it to the correct array based on is extension type
      const name = validateNoSpace(filename.trim())
      const ext = path.extname(filename)
      const assetName = path.basename(name, ext)
      const requireText = `  ['${assetName}']: require('${name}')`

      // Check if the asset is a font
      // and add the requireText to the correct array
      fontExts.includes(ext)
        ? builtFonts.push(requireText)
        : builtAssets.push(requireText)

      return builtAssets
    }, [])

  // Write the assets and font imports to a valid javascript file
  ;(builtFonts.length || builtAssets.length) &&
    writeAssetFiles({
      builtFonts,
      builtAssets,
      fontsPath: defFontsPath,
      assetsPath: defAssetsPath,
      fontsIndex:
        pathsConfig.fontsIndex ||
        pathsConfig.folderRootFile ||
        tapConstants.fontsIndex,
      assetIndex:
        pathsConfig.assetsIndex ||
        pathsConfig.folderRootFile ||
        tapConstants.assetsIndex,
    })

  // Return the assetsRelative path so it can work with the aliases which are also relative
  return { ASSETS_PATH: assetsRelative, FONTS_PATH: fontsRelative }
}
