const { DOCKER } = require('KegConst/docker')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { getServiceArgs } = require('KegUtils/services')

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

  return runInternalTask(
    'docker.tasks.image.tasks.run',
    getServiceArgs(args, { context: 'tap', tap: args.params.tap, image: 'tap', container: 'tap' })
  )

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
      cmd: {
        alias: [ 'entry', 'command' ],
        description: 'Overwrite entry of the image. Use escaped quotes for spaces ( bin/bash)',
        example: 'keg tap run --cmd \\"node index.js\\"',
        default: '/bin/bash'
      },
      log: {
        description: 'Log the docker run command to the terminal',
        example: 'keg tap run --log',
        default: false,
      }
    }
  }
}