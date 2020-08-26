const { deepFreeze } = require('@svkeg/jsutils')
const containers = require('./containers')

const {
  cliKeyMap,
  images,
  locationContext,
  mutagenMap,
  containersPath,
} = require('./values')

const DOCKER = {
  ...require('./machine'),
  ...require('./volumes'),
  CLI_KEY_MAP: cliKeyMap,
  IMAGES: images,
  LOCATION_CONTEXT: locationContext,
  CONTAINERS_PATH: containersPath,
  MUTAGEN_MAP: mutagenMap,
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = { DOCKER }