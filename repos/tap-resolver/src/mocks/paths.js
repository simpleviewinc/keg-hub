const path = require('path')

const kegPath = path.join(__dirname, '../../')
const basePath = path.join(__dirname, './base')
const webResolverPath = path.join(__dirname, './base/webResolver')
const tapPath = path.join(__dirname, './taps/test')
const tapAssetsPath = path.join(__dirname, './taps/test/assets')
const tapConfigPath = path.join(__dirname, './taps/test/app.json')

module.exports = {
  kegPath,
  basePath,
  tapPath,
  tapAssetsPath,
  tapConfigPath,
  webResolverPath
}
