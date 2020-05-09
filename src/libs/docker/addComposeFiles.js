const { DOCKER } = require('KegConst/docker')

const addComposeFiles = (dockerCmd) => {
  const defCompose = `-f ${DOCKER.COMPOSE_PATH}/compose-default.yml`
  const envCompose = DOCKER.NODE_ENV
    ? `-f ${DOCKER.COMPOSE_PATH}/docker-compose-${DOCKER.NODE_ENV}.yml`
    : ''

  return `${dockerCmd} ${defCompose} ${envCompose}`
}

module.exports = {
  addComposeFiles
}