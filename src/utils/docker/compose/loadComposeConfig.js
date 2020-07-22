const path = require('path')
const { DOCKER } = require('KegConst/docker')
const { yml } = require('KegFileSys/yml')
const { get } = require('@ltipton/jsutils')
const { throwNoComposeService } = require('../../error/throwNoComposeService')
const { getContainerConst } = require('../getContainerConst')

/**
 * Loads a docker-compose file based on passed in path
 * @param {Object} args - args used to find the compose file
 * @param {Object} args.composePath - Path to the docker-compose file
 * @param {Object} args.context - Container context of the docker-compose file to load
 *
 * @returns {Object} - Loaded docker-compose.yml config file
 */
const loadComposeConfig = async ({ composePath, context }) => {
  const loadPath = composePath ||
    (context && getContainerConst(context, `ENV.KEG_COMPOSE_DEFAULT`))

  const composeConfig = loadPath && await yml.load(loadPath) || null

  return composeConfig || throwNoComposeService(loadPath)
}

module.exports = {
  loadComposeConfig
}