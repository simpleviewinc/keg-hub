const { GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst/constants')
const { get } = require('@keg-hub/jsutils')

const getEditorCmd = globalConfig => {
  return get(globalConfig, GLOBAL_CONFIG_EDITOR_CMD)
}

module.exports = {
  getEditorCmd
}