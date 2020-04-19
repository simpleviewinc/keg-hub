const { GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst')
const { get } = require('jsutils')

const getEditorCmd = globalConfig => {
  return get(globalConfig, GLOBAL_CONFIG_EDITOR_CMD)
}

module.exports = {
  getEditorCmd
}