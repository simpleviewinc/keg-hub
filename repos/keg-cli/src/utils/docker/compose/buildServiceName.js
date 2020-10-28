
/**
 * Gets the docker-compose service name
 * Uses the contextEnvs.KEG_COMPOSE_SERVICE || contextEnvs.IMAGE || cmdContext
 * @param {string} - Context to run the compose command in
 * @param {Object} - ENVs for the context
 *
 * @return {string} - Name of the docker-compose service
 */
const buildServiceName = (cmdContext, contextEnvs={}) => {
  return contextEnvs.KEG_COMPOSE_SERVICE || contextEnvs.IMAGE || cmdContext
}



module.exports = {
  buildServiceName
}