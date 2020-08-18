const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildDockerCmd } = require('KegUtils/docker')
const { copyFileSync, removeFileSync } = require('KegFileSys/fileSys')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError, throwNoTapLoc } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')

/**
 * Copies over the keg-core package.json to the taps temp folder
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 *
 * @returns {void}
 */
const copyLocalPackageJson = async (globalConfig, location) => {
  const corePath = getPathFromConfig(globalConfig, 'core')
  !corePath && generalError(`Could not find keg-core path in globalConfig`)

  // Get the paths for the keg-core and the taps temp folder
  const corePackage = path.join(corePath, 'package.json')
  const tapCorePackage = path.join(location, `temp/core-package.json`)

  // Copy the file to the temp folder
  copyFileSync(corePackage, tapCorePackage)

}

/**
 * Removes the copied keg-core package.json from the taps temp folder
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} location - Location of the tap on the host machine
 *
 * @returns {void}
 */
const removeLocalPackageJson = async (globalConfig, location) => {
  const corePath = getPathFromConfig(globalConfig, 'core')
  !corePath && generalError(`Could not find keg-core path in globalConfig`)

  // Get the temp path for the keg-core package.json
  const tapCorePackage = path.join(location, `temp/core-package.json`)

  // Remove the keg-core file from the temp path
  return removeFileSync(tapCorePackage)

}


/**
 * Builds a docker container so it can be run
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const dockerBuild = async args => {
  const { globalConfig, options, task, tasks } = args

  // Remove container from the params if it exists
  // Otherwise it would cause getContext to fail
  // Because it thinks it needs to ask for the non-existent container
  const { container,  ...params } = args.params
  const { context, core, log } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const {
    tap,
    image,
    location,
    cmdContext,
    contextEnvs,
  } = await buildContainerContext({ ...args, params })


  // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && throwNoTapLoc(globalConfig, tap)

  // Build the docker build command with options
  const dockerCmd = await buildDockerCmd(globalConfig, {
    ...params,
    location,
    cmd: `build`,
    options: options,
    context: cmdContext,
    ...(tap && { tap }),
    ...(image && { image }),
    ...(params.args && { buildArgs: contextEnvs }),
  })

  Logger.info(`Building docker image "${ image || cmdContext }" ...`)

  // Run the built docker command
  await docker.raw(dockerCmd, { log, options: { env: contextEnvs }}, location)

  // Return the built image as a json object
  // This is needed for internal keg-cli calls
  return docker.image.get(image || contextEnvs.IMAGE)

}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'b' ],
    action: dockerBuild,
    description: `Runs docker build command for a container`,
    example: 'keg docker build <options>',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        example: 'keg docker build --context core',
        enforced: true,
      },
      args: {
        example: 'keg docker build --args false',
        description: 'Add build args from container env files',
        default: true
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        example: `keg docker build --cache false`,
        default: true
      },
      core: {
        description: 'Use the local keg-core package.json when install node_modules during the build',
        example: `keg docker build --context tap --core true`,
        default: false,
      },
      local: {
        description: 'Copy the local repo into the docker container at build time',
        example: `keg docker build --local`,
        default: false,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg docker build --context tap --tap events-force`,
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg docker build tags=my-tag,local,development'
      },
      log: {
        description: 'Log docker command',
        example: 'keg docker build log=true',
        default: false
      },
    }
  }
}
