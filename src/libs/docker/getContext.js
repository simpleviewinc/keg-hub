const { DOCKER } = require('KegConst/docker')
const { get } = require('jsutils')

const getContext = (globalConfig, context) => {
  const cmdContext = get(DOCKER, `BUILD.${ context.toUpperCase() }`, {})
  return {
    path: get(context, 'ENV.CONTEXT_PATH', ''),
    dockerFile: get(context, 'ENV.CONTEXT_DOCKER_FILE', '')
  }
}


module.exports = {
  getContext
}