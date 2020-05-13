const { get } = require('jsutils')
const { DOCKER } = require('KegConst')
const { BUILD } = DOCKER

const getEnvContext = (context) => {
  return get(DOCKER, `BUILD.${ context.toUpperCase() }.ENV`, {})
}

module.exports = {
  getEnvContext
}