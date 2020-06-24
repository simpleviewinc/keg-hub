const { deepFreeze } = require('jsutils')
const containers = require('./containers')
const {
  cliKeyMap,
  defaultENVs,
  dockerEnv,
  images,
  locationContext,
  mutagenMap
} = require('./values')

const DOCKER = {
  ...require('./machine'),
  ...require('./run'),
  ...require('./volumes'),
  CLI_KEY_MAP: cliKeyMap,
  IMAGES: images,
  DOCKER_ENV: dockerEnv,
  LOCATION_CONTEXT: locationContext,
  CONTAINERS_PATH: defaultENVs.CONTAINERS_PATH,
  MUTAGEN_MAP: mutagenMap,
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = deepFreeze({ DOCKER })