const { DOCKER } = require('KegConst/docker')
const { get } = require('jsutils')

const addComposeFiles = (dockerCmd, context) => {
  const defCompose = `-f ${DOCKER.ENV.COMPOSE_DEFAULT}`
  const envCompose = DOCKER.DOCKER_ENV
    ? `-f ${DOCKER.CONTAINERS_PATH}/${context}/compose-${DOCKER.DOCKER_ENV}.yml`
    : ''

  return `${dockerCmd} ${defCompose} ${envCompose}`
}

module.exports = {
  addComposeFiles
}