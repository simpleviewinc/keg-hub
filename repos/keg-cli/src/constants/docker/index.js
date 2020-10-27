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
  IMAGES: images,
  CLI_KEY_MAP: cliKeyMap,
  MUTAGEN_MAP: mutagenMap,
  LOCATION_CONTEXT: locationContext,
  CONTAINERS_PATH: containersPath,
  // TODO: Update this to load from the global ENVs
  KEG_DOCKER_NETWORK: 'keg-hub-net',
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = { DOCKER }