
/**
 * Builds the name of the composer service
 * @param {string} - Context to run the compose command in
 * @param {Object} - ENVs for the context
 *
 * @return {string} - Name of the composer service
 */
const buildComposeName = (cmdContext, contextEnvs) => {
  return contextEnvs.IMAGE
    ? contextEnvs.VERSION
      ? `${contextEnvs.IMAGE}:${contextEnvs.VERSION}`
      : `${contextEnvs.IMAGE}:latest`
    : cmdContext
}



module.exports = {
  buildComposeName
}