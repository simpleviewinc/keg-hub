const buildAliases = require('./buildAliases')
const buildAssets = require('./buildAssets')
const buildClientList = require('./buildClientList')
const buildConstants = require('./buildConstants')
const getAppConfig = require('./getAppConfig')
const contentResolver = require('./contentResolver')
const setup = require('./setup')
const setupClient = require('./setupClient')
const webResolver = require('./webResolver')

exports = {
  buildAliases,
  buildAssets,
  buildClientList,
  buildConstants,
  getAppConfig,
  contentResolver,
  setup,
  setupClient,
  webResolver,
}