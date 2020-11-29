const path = require('path')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { buildDockerCmd } = require('KegUtils/docker')
const { copyFileSync, removeFileSync } = require('KegFileSys/fileSys')
const { mergeTaskOptions } = require('KegUtils/task/options/mergeTaskOptions')
const { throwRequired, generalError, throwNoTapLoc } = require('KegUtils/error')
const { getPathFromConfig } = require('KegUtils/globalConfig/getPathFromConfig')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

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
  const { globalConfig, options, __internal={} } = args
  // Check if an internal location context was passed

  // Make a copy of the task, so we don't modify the original
  const task = {
    ...args.task,
    // If it was, update to the task location context to match it
    locationContext: __internal.locationContext || args.task.locationContext
  }

  // Remove container from the params if it exists
  // Otherwise it would cause getContext to fail
  // Because it thinks it needs to ask for the non-existent container
  const { container,  ...params } = args.params
  const { context, log } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext({
    ...args,
    task,
    params
  })

  const {
    tap,
    image,
    location,
    cmdContext,
    contextEnvs,
  } = containerContext

  // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && throwNoTapLoc(globalConfig, tap)

  // Build the docker build command with options
  const dockerCmd = await buildDockerCmd({
    ...args,
    containerContext,
    params: {
      ...params,
      location,
      cmd: `build`,
      options: options,
      context: cmdContext,
      ...(tap && { tap }),
      ...(image && { image }),
      ...(params.args && { buildArgs: contextEnvs }),
    }
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
    options: mergeTaskOptions(`docker`, `build`, `build`, {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        example: 'keg docker build --context core',
        enforced: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: `keg docker build --context tap --tap events-force`,
      },
      local: {
        default: false,
      },
    })
  }
}
