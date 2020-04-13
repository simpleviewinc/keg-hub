const { spawnCmd } = require('KegProc')
const { confirmExec, getPathFromConfig, throwNoConfigPath } = require('KegUtils')
const { buildDockerCmd, addDockerArg, addValueFiles, getBuildArgs } = require('KegDocker')
const { Logger } = require('KegLog')
const { getArguments } = require('KegUtils')

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const upDockerCompose = async args => {
  const { globalConfig } = args

  const location = getPathFromConfig(globalConfig, 'docker')
  if(!location) throwNoConfigPath(globalConfig, 'docker')

  const { cache, remove, pull } = getArguments(args)

  let dockerCmd = `docker-compose`
  dockerCmd = addValueFiles(dockerCmd)
  dockerCmd = `${dockerCmd} build`
  dockerCmd = getBuildArgs(globalConfig, { name: 'tap', dockerCmd })
  
  dockerCmd = addDockerArg(dockerCmd, '--force-rm', Boolean(remove))
  dockerCmd = addDockerArg(dockerCmd, '--no-cache', !Boolean(cache))
  dockerCmd = addDockerArg(dockerCmd, '--pull', Boolean(pull))

  await spawnCmd(`${dockerCmd} tap`, location)

}

module.exports = {
  name: 'build',
  alias: [ 'b' ],
  action: upDockerCompose,
  description: `Run docker-compose build command`,
  example: 'keg docker compose build <options>',
  options: {
    remove: {
      description: 'Always remove intermediate containers',
      example: 'keg docker compose build --remove',
      default: true
    },
    cache: {
      description: 'Use cache when building the container',
      example: 'keg docker compose build --cache',
      default: true
    },
    pull: {
      description: 'Always attempt to pull a newer version of the image',
      example: 'keg docker compose build --pull',
      default: true
    }
  }
}
