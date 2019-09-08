const fs = require('fs')
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
  const allExtensions = assetExtensions.concat(extensions)
  return Array.from(
    new Set(
      fs.readdirSync(clientAssetPath)
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
module.exports = (BASE_PATH, CLIENT_PATH, extensions) => {
  const clientAssetPath = `${CLIENT_PATH}/assets`
  // Get's all the images assets in the clients assets folder
  let properties = assetFileNames(clientAssetPath, extensions)
    .map(name => `${name.split('.').shift()}: require('${clientAssetPath}/${name}')`)
    .join(',\n  ')
  const string = `const assets = {\n  ${properties}\n}\nexport default assets`
  
  const assetsPath = `${BASE_PATH}/assets/index.js`

  fs.writeFileSync(assetsPath, string, 'utf8')
  
  return { CLIENT_ASSETS_PATH: assetsPath }
}