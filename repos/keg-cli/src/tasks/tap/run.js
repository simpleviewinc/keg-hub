const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { pullService } = require('KegUtils/services/pullService')
const { generalError } = require('KegUtils/error/generalError')

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
const runTap = async (args) => {

  const exArgs = { context: 'tap', tap: args.params.tap, image: 'tap' }
  const isPulled = await pullService(args, exArgs)

  return runService(args, { ...exArgs, container: 'tap' }) 

}
module.exports = {
  run: {
    name: 'run',
    alias: [ 'st' ],
    action: runTap,
    inject: true,
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    description: `Runs a tap image directly`,
    example: 'keg tap run <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap run --tap events-force',
        required: true,
      },
      cleanup: {
        alias: [ 'clean', 'rm' ],
        description: 'Auto remove the docker container after exiting',
        example: `keg tap run  --cleanup false`,
        default: true
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker run command options',
        example: `keg tap run --options \\"-p 80:19006 -e MY_ENV=data\\"`,
        default: []
      },
      entry: {
        alias: [ 'entrypoint', 'ent' ],
        description: 'Overwrite ENTRYPOINT of the image. Use escaped quotes for spaces ( bin/bash)',
        example: 'keg tap run --entry node'
      },
      cmd: {
        alias: [ 'command', 'cm' ],
        description: 'Overwrite CMD of the image. Use escaped quotes for spaces ( bin/bash)',
        example: 'keg tap run --cmd \\"node index.js\\"',
        default: '/bin/bash'
      },
      satisfy: {
        alias: [ 'sat', 'ensure' ],
        description: 'Will check if required docker images are pulled and built. Will then pull and build images as needed',
        example: `keg tap run --no-satisfy`,
        default: true,
      },
      log: {
        description: 'Log the docker run command to the terminal',
        example: 'keg tap run --log',
        default: false,
      }
    }
  }
}