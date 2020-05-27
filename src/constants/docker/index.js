const { deepFreeze } = require('jsutils')
const { defaultENVs, runtimeEnv, images, locationContext } = require('./values')

module.exports = deepFreeze({
  DOCKER: {
    ...require('./containers'),
    ...require('./machine'),
    ...require('./run'),
    ...require('./volumes'),
    IMAGES: images,
    CONTAINERS_PATH: defaultENVs.CONTAINERS_PATH,
    DOCKER_ENV: runtimeEnv,
    LOCATION_CONTEXT: locationContext,
  }
})