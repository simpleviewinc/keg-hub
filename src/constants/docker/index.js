const { deepFreeze } = require('jsutils')
const { containersPath, configEnv, images, locationContext } = require('./values')

module.exports = deepFreeze({
  DOCKER: {
    ...require('./containers'),
    ...require('./machine'),
    ...require('./run'),
    ...require('./volumes'),
    IMAGES: images,
    CONTAINERS_PATH: containersPath,
    DOCKER_ENV: configEnv,
    LOCATION_CONTEXT: locationContext,
  }
})