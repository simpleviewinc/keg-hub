const { get } = require('jsutils')
const { throwRequired, generalError } = require('KegUtils/error')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')

/**
 * Run a docker image command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerImage = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { cmd, name, force, format } = params
  const image = name && get(CONTAINERS, `${name.toUpperCase()}.ENV.IMAGE`)

  const cmdArgs = { ...params }

  cmdArgs.opts = cmd
    ? image
      ? [ cmd, image ]
      : [ cmd ]
    : [ 'ls' ]

  const res = await docker.image(cmdArgs)

  // Log the output of the command
  dockerLog(res, cmd)

  return res

}

module.exports = {
  image: {
    name: 'image',
    alias: [ 'img', 'i', 'di' ],
    action: dockerImage,
    tasks: {
      ...require('./clean'),
      ...require('./get'),
      ...require('./remove'),
      ...require('./run'),
    },
    description: `Runs docker image command`,
    example: 'keg docker image <options>',
    options: {
      cmd: {
        description: 'Docker image command to run. Default ( ls )',
        example: 'keg docker image ls',
      },
      name: {
        description: 'Name of the container to run the command on',
        example: 'keg docker image --name core',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker image --force ',
      },
      format: {
        allowed: [ 'json' ],
        description: 'Change output format of docker cli commands',
        example: 'keg docker image --format json ',
      },
    },
  }
}
