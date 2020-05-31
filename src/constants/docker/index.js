const { deepFreeze } = require('jsutils')
const { defaultENVs, dockerEnv, images, locationContext } = require('./values')

module.exports = deepFreeze({
  DOCKER: {
    ...require('./containers'),
    ...require('./machine'),
    ...require('./run'),
    ...require('./volumes'),
    IMAGES: images,
    DOCKER_ENV: dockerEnv,
    LOCATION_CONTEXT: locationContext,
    CONTAINERS_PATH: defaultENVs.CONTAINERS_PATH,
  }
})