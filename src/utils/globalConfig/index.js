const { addGlobalConfigProp } = require('./addGlobalConfigProp')
const { createGlobalConfig } = require('./createGlobalConfig')
const { getGlobalConfig } = require('./getGlobalConfig')
const { removeGlobalConfigProp } = require('./removeGlobalConfigProp')
const { saveGlobalConfig } = require('./saveGlobalConfig')
const { validateGlobalConfig } = require('./validateGlobalConfig')

module.exports = {
  addGlobalConfigProp,
  createGlobalConfig,
  getGlobalConfig,
  removeGlobalConfigProp,
  saveGlobalConfig,
  validateGlobalConfig
}