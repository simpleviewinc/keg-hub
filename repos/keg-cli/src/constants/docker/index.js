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
  DOCKER_NETWORK: 'keg-hub-net',
  LOCATION_CONTEXT: locationContext,
  CONTAINERS_PATH: containersPath,
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = { DOCKER }