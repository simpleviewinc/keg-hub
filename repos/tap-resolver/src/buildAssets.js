const fs = require('fs')
const path = require('path')
const { get, isStr } = require('jsutils')

const assetExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.ttf',
]

/**
 * Gets all the asset files names from the passed in clientAssetPath
 * @param {string} clientAssetPath - path to the clients assets folder
 * @param {Array} extensions - Allowed asset extensions
 *
 * @returns {Array} - all assets found for the passed in client
 */
const assetFileNames = (clientAssetPath, extensions=[]) => {

  // Get all allowed extensions
  const allExtensions = assetExtensions.concat(extensions)

  // Create an Array from the assets found at the clientAssetPath
  return Array.from(
    // Use Set to ensure all files are unique
    new Set(
      // Read all the files from the passed in path
      fs.readdirSync(clientAssetPath)
        // Filter out any that don't match the allowed asset extensions
        .filter(file => allExtensions.indexOf(`.${ file.split('.').pop() }`) !== -1)
    )
  )
}

/**
 * Generates a client image cache file, which allows loading client specific images
 * @param {*} BASE_PATH - base directory of the app components
 * @param {*} CLIENT_NAME - name of the client folder where the assets exist
 * @param {*} CLIENT_PATH - path to the clients folder
 *
 * @returns {Object} - path to clients assets
 */
module.exports = (appConf, BASE_PATH, CLIENT_PATH, extensions) => {

  // Get the client assets defined path from the app config
  const clientAssets = get(appConf, [ 'clientResolver', 'paths', 'clientAssets' ])

  // Check the client assets, if none, use the base assets
  const clientAssetPath = !clientAssets || !isStr(clientAssets)
    ? path.join(BASE_PATH, 'assets')
    : path.join(CLIENT_PATH, clientAssets)

  // Gets all the images assets in the clients assets folder
  let properties = assetFileNames(clientAssetPath, extensions)
    .map(name => `${name.split('.').shift()}: require('${clientAssetPath}/${name}')`)
    .join(',\n  ')

  // Ass the assets content to the assets object
  const string = `const assets = {\n  ${properties}\n}\n\nexport default assets`

  // Build the location to save the assets
  const assetsPath = `${clientAssetPath}/index.js`
 
  // Write the file to the assets location
  fs.writeFileSync(assetsPath, string, 'utf8')

  // Return the path of the new assets file
  return assetsPath
}