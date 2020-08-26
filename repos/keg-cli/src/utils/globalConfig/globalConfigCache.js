
/**
 * Temp variable to hold the global config, so we only have to load it once
 * @object
 */
let __GLOBAL_CONFIG

/**
 * Updates the globalConfig cache
 * @function
 * @param {Object} updatedConfig - Updated global config to be cached
 *
 * @returns {void}
 */
// TODO: Might need to loop and update paths when running keg-cli in a docker container
// The cli.paths will based on the users local paths; not the docker containers paths
const __updateGlobalConfig = updatedConfig => updatedConfig && (__GLOBAL_CONFIG = updatedConfig)

/**
 * Gets the cached globalConfig object
 * @function
 *
 * @returns {Object} - Cache global config
 */
const __getGlobalConfig = () => __GLOBAL_CONFIG


module.exports = {
  __getGlobalConfig,
  __updateGlobalConfig,
}