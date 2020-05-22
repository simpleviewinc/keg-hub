const { deepFreeze } = require('jsutils')
const { containersPath, configEnv, containers } = require('./values')

module.exports = deepFreeze({
  DOCKER: {
    ...require('./build'),
    ...require('./machine'),
    ...require('./run'),
    ...require('./volumes'),
    CONTAINERS: containers,
    CONTAINERS_PATH: containersPath,
    DOCKER_ENV: configEnv,
  }
})