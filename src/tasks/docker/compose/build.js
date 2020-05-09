const { get } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')
const { getPathFromConfig, throwNoConfigPath } = require('KegUtils')
const {
  addDockerArg,
  addComposeFiles,
  buildDockerCmd,
  getContext,
  getBuildArgs,
} = require('KegDocker')

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildDockerCompose = async args => {
  const { globalConfig, params } = args

  const location = getPathFromConfig(globalConfig, 'docker')
  if(!location) throwNoConfigPath(globalConfig, 'docker')

  const { cache, remove, pull, context } = params
  
  const cmdContext = context || get(args, task.options.context.default, 'core')
  const composeContext = getContext(globalConfig, cmdContext)
  
  let dockerCmd = `docker-compose`
  dockerCmd = addComposeFiles(dockerCmd, cmdContext)
  // dockerCmd = `${dockerCmd} build`
  // dockerCmd = await getBuildArgs(globalConfig, { name: 'tap', dockerCmd })
  
  // dockerCmd = addDockerArg(dockerCmd, '--force-rm', Boolean(remove))
  // dockerCmd = addDockerArg(dockerCmd, '--no-cache', !Boolean(cache))
  // dockerCmd = addDockerArg(dockerCmd, '--pull', Boolean(pull))

  // console.log(`---------- dockerCmd ----------`)
  // console.log(dockerCmd)

  // TODO: add some type of ENV loading for docker compose up command
  // Would look something like this => env $(cat local.env) docker-compose up
  // ENV_FILE=.env.production.local docker-compose -f docker-compose.prod.yml up --build
  // docker-compose --env-file foo.env up => This should work
  // await spawnCmd(`${dockerCmd} tap`, location)

}

module.exports = {
  name: 'build',
  alias: [ 'b' ],
  action: buildDockerCompose,
  description: `Run docker-compose build command`,
  example: 'keg docker compose build <options>',
  options: {
    context: {
      allowed: [ 'tap', 'core' ],
      description: 'Context of docker compose build command (tap || core)',
      example: 'keg docker compose build --context core',
      default: 'core'
    },
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
