const { get, isStr } = require('@ltipton/jsutils')
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
const getContainerConst = (container, key, alt) => {
  return get(
    DOCKER,
    `CONTAINERS.${ container.toUpperCase() }${ isStr(key) ? '.' + key.toUpperCase() : '' }`,
    alt
  )
}

module.exports = {
  getContainerConst
}