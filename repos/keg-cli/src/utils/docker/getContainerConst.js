const { get, isStr } = require('@svkeg/jsutils')
const { DOCKER } = require('KegConst/docker')

/**
 * Helper to get the constant data of a docker container
 * @function
 * @param {string} container - Name of the container to get the info for
 * @param {string} key - Sub-key of the constant container object to return
 * @param {Object} alt - Alternate object to return if the container does not exist
 *
 * @returns {Object} - Constants container object data
 */
const getContainerConst = (container, key='', alt) => {
  let [ mainKey, ...subKeys ] = key.split('.')
  mainKey = mainKey.toUpperCase()

  const constPath = mainKey === 'ARGS' || mainKey === 'ENV'
    ? `.${ key.toUpperCase() }`
    : `.${ mainKey.toUpperCase() }.${ subKeys.join('.') }`

  return get(
    DOCKER,
    `CONTAINERS.${ container.toUpperCase() }${ constPath }`,
    alt
  )
}

module.exports = {
  getContainerConst
}