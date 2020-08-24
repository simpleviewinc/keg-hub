const { GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst/constants')
const { get } = require('@svkeg/jsutils')

const getEditorCmd = globalConfig => {
  return get(globalConfig, GLOBAL_CONFIG_EDITOR_CMD)
}

module.exports = {
  getEditorCmd
}