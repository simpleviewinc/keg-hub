const { DOCKER } = require('KegConst/docker')
const { get } = require('jsutils')

/**
 * Adds the paths to the docker compose file for the env
 * @function
 * @param {string} dockerCmd - Docker command to add the compile file paths to
 * @param {string} context - Context the docker command is being run in ( core / tap )
 *
 * @returns {string} - dockerCmd string with the file paths added
 */
const addComposeFiles = (dockerCmd, context='') => {

  const compDefPath = get(DOCKER, `BUILD.${ context.toUpperCase() }.ENV.COMPOSE_DEFAULT`)
  const defCompose = compDefPath ? `-f ${ compDefPath }` : ''

  const envCompose = DOCKER.DOCKER_ENV
    ? `-f ${DOCKER.CONTAINERS_PATH}/${context}/compose-${DOCKER.DOCKER_ENV}.yml`
    : ''

  return `${dockerCmd} ${defCompose} ${envCompose}`.trim()
}

module.exports = {
  addComposeFiles
}