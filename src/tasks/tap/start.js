const { get } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { generalError } = require('KegUtils/error/generalError')
const { buildBaseImg } = require('KegUtils/builders/buildBaseImg')
const { checkBuildImage } = require('KegUtils/builders/checkBuildImage')
const { throwInvalidSyncParams } = require('KegUtils/error/throwInvalidSyncParams')
const {
  composeService,
  containerService,
  mutagenService,
} = require('KegUtils/services')


/**
 * Start a docker-sync or docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startTap = async (args) => {
  const { params } = args
  const { attached, build, ensure, log, service, tap } = params

  // Ensure the sync params are correct
  throwInvalidSyncParams(params)

  // Check if the base image exists, and if not then build it
  log && Logger.info(`Checking base docker image...`)
  ensure && await buildBaseImg(args)

  // Check if we should build the container image first
  log && Logger.info(`Checking tap docker image...`)
  ;(ensure || build) && await checkBuildImage(args, 'tap', 'tap', tap)

  // Check and run the correct service
  const serviceResp = service === 'container'
    ? await containerService(args, { container: 'tap', tap })
    : await composeService(args, { container: 'tap', tap })

  // TODO: Add mutagen service here
  // await mutagenService(args, {})

  return serviceResp

}

module.exports = {
  start: {
    name: 'start',
    alias: [ 'st', 'run' ],
    action: startTap,
    description: `Runs a tap in a docker container`,
    example: 'keg tap start <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        required: true,
      },
      attached: {
        alias: [ 'attach', 'att', 'at' ],
        allowed: [ false, 'sync', 'compose' ],
        description: 'Attaches to a process in lieu of running in the backgound. Overrides "detached"',
        example: `keg core start --attach compose ( Runs sync in background and attaches to compose) `,
        default: false,
      },
      build: {
        description: 'Removes and rebuilds the docker container before running the tap',
        default: false
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: 'keg tap --cache false',
        default: true
      },
      clean: {
        description: 'Cleans docker-sync before running the tap',
        example: 'keg tap start --clean true',
        default: false
      },
      command: {
        alias: [ 'cmd' ],
        description: 'The command to run when the container starts. Overwrites the default (yarn web)',
        example: 'keg tap start --command ios',
        default: 'web'
      },
      destroy: {
        alias: [ 'des' ],
        description: 'All collateral items will be destoryed if the sync task fails ( true )',
        example: 'keg tap start --destroy false',
        default: true
      },
      docker: {
        alias: [ 'doc' ],
        description: `Extra docker arguments to pass to the 'docker run command'`
      },
      env: {
        alias: [ 'environment' ],
        description: 'Environment to start the Docker service in',
        default: 'development',
      },
      ensure: {
        description: 'Will check if required images are built, and build them in necessary.',
        example: "keg core start --ensure false",
        default: true,
      },
      install: {
        description: 'Install node_modules ( yarn install ) in the container before starting the app',
        example: 'keg core start --install',
        default: false
      },
      log: {
        alias: [ 'lg' ],
        description: 'Prints log information as the task runs',
        example: 'keg core start --log',
        default: false,
      },
      mounts: {
        alias: [ 'mount' ],
        description: `List of key names or folder paths to mount into the docker container`
      },
      service: {
        allowed: [ 'compose', 'sync', 'container' ],
        description: 'What docker service to build the tap with. Must be on of ( sync || container ). Same as passing options "--attached sync "',
        example: 'keg core --service container',
        default: 'compose'
      }
    }
  }
}