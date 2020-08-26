const { runService } = require('KegUtils/services')
const { DOCKER } = require('KegConst/docker')

/**
 * Start a tap with docker-compose
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const runBase = async (args) => {
  return runService(args, { context: 'base', tap: undefined })
}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'start', 'st' ],
    action: runBase,
    inject: true,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Runs the base image directly`,
    example: 'keg base run <options>',
    options: {
      cleanup: {
        alias: [ 'clean', 'rm' ],
        description: 'Auto remove the docker container after exiting',
        example: `keg base run  --cleanup false`,
        default: true
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker run command options',
        example: `keg base run --options \\"-p 80:19006 -e MY_ENV=data\\"`,
        default: []
      },
      cmd: {
        alias: [ 'entry', 'command' ],
        description: 'Overwrite entry of the image. Use escaped quotes for spaces ( bin/bash )',
        example: 'keg base run --entry \\"node index.js\\"',
        default: '/bin/bash'
      },
      log: {
        description: 'Log the docker run command to the terminal',
        example: 'keg base run --log',
        default: false,
      },
      sync: {
        description: 'Creates a mutagen sync between the local Keg-CLI and the docker container',
        example: 'keg base run --sync false',
        default: true,
      }
    }
  }
}