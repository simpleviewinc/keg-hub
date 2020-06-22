const { deepFreeze } = require('jsutils')
const { cliKeyMap, defaultENVs, dockerEnv, images, locationContext } = require('./values')
const containers = require('./containers')

const DOCKER = {
  ...require('./machine'),
  ...require('./run'),
  ...require('./volumes'),
  CLI_KEY_MAP: cliKeyMap,
  IMAGES: images,
  DOCKER_ENV: dockerEnv,
  LOCATION_CONTEXT: locationContext,
  CONTAINERS_PATH: defaultENVs.CONTAINERS_PATH,
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = deepFreeze({ DOCKER })