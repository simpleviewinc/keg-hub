const { get } = require('@ltipton/jsutils')
const { DOCKER } = require('KegConst/docker')

/**
 * Gets the path in the docker container the sync will use
 * @param {string} context - Context or name of the container to get the remote path from
 * @param {string} dependency - Name contained in an ENV that defines the path in docker
 * @param {string} remote - Path in the docker container where the sync will be created
 *
 * @returns {string}
 */
const getRemotePath = (context, dependency, remote) => {
  return remote || get(
    DOCKER,
    `CONTAINERS.${ context.toUpperCase() }.ENV.DOC_${ dependency.toUpperCase() }_PATH`
  )
}

module.exports = {
  getRemotePath
}