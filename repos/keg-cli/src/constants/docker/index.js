const containers = require('./containers')
const { KEG_ENVS } = require('../envs')

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
  KEG_PROXY_HOST: KEG_ENVS.KEG_PROXY_HOST,
  KEG_DOCKER_NETWORK: KEG_ENVS.KEG_DOCKER_NETWORK,
  PACKAGE_URL: 'docker.pkg.github.com/simpleviewinc/keg-packages'
}

// Add the CONTAINERS property, with a get function do it only get called when referenced
Object.defineProperty(DOCKER, 'CONTAINERS', { get: () => containers.CONTAINERS, enumerable: true })

module.exports = { DOCKER }