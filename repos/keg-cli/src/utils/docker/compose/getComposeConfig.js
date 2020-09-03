const { get } = require('@keg-hub/jsutils')
const { loadComposeConfig } = require('./loadComposeConfig')

/**
 * gets the docker-compose.yml config based on the KEG_COMPOSE_DEFAULT of the contextEnvs
 * @param {Object} contextEnvs - Defined environment variables for the image
 * @param {string=} composePath - Path to the docker-compose.yml file to load
 *
 * @returns {Object} - Loaded docker-compose.yml config file
 */
const getComposeConfig = (contextEnvs, composePath) => {
  composePath = composePath || get(contextEnvs, `KEG_COMPOSE_DEFAULT`)
  return composePath && loadComposeConfig({ composePath, skipThrow: true })
}

module.exports = {
  getComposeConfig
}