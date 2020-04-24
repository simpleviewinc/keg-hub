const { spawnCmd } = require('KegProc')
const { getPathFromConfig, throwNoConfigPath } = require('KegUtils')
const { Logger } = require('KegLog')
const { addValueFiles, addDockerArg } = require('KegDocker')

/**
 * Runs docker-compose up
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const upDockerCompose = async args => {
  const { globalConfig, params } = args

  const location = getPathFromConfig(globalConfig, 'docker')
  if(!location) throwNoConfigPath(globalConfig, 'docker')

  const { detached, build } = params

  let dockerCmd = `docker-compose`
  dockerCmd = addValueFiles(dockerCmd)
  dockerCmd = `${dockerCmd} up`
  
  dockerCmd = addDockerArg(dockerCmd, '--detach', Boolean(detached))
  dockerCmd = addDockerArg(dockerCmd, '--build', Boolean(build))

  // TODO: add some type of ENV loading for docker compose up command
  // Would look something like this => env $(cat local.env) docker-compose up
  // ENV_FILE=.env.production.local docker-compose -f docker-compose.prod.yml up --build
  // docker-compose --env-file foo.env up => This should work
  await spawnCmd(dockerCmd, location)

}

module.exports = {
  name: 'up',
  alias: [ 'u' ],
  action: upDockerCompose,
  description: `Run docker-compose up command`,
  example: 'keg docker compose up <options>',
  options: {
    build: {
      description: 'Build the docker containers before starting',
      example: 'keg docker compose up --build',
      default: false
    },
    detached: {
      description: 'Runs the docker-sync process in the background',
      example: 'keg docker compose up --detached',
      default: false
    }
  }
}
