const { throwRequired, generalError } = require('KegUtils/error')
const { getPathFromConfig, getTapPath } = require('KegUtils/globalConfig')
const { logVirtualIP } = require('KegUtils/log')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd, executeCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')

/**
 * Builds a docker container so it can be run
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerBuild = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { name, tap, mounts, image, docker, env } = params

  // If the name is tap, then set the name argument to the value of the tap argument
  !name && throwRequired(task, 'name', task.options.name)

  // Get the folder location the image should built from
  const location = getPathFromConfig(globalConfig, name) || getTapPath(globalConfig, tap)
  !location && generalError(
    `Location could not be found on disk for ${ tap || name}!`,
    `Please ensure the path exists in the global config!`
  )

  // Build the docker run command with options
  const dockerCmd = buildDockerCmd(globalConfig, {
    env,
    tap,
    name,
    image,
    docker,
    mounts,
    location,
    cmd: `run`,
  })

  // Log out the containers ip, so we know how to connect to it in the browser
  await logVirtualIP()

  // Run the container
  await spawnCmd(dockerCmd, location)

}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'r' ],
    action: dockerBuild,
    description: `Runs docker build command for a container`,
    example: 'keg docker build <options>',
    location_context: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      env: {
        description: 'Environment to start the Docker container in',
        default: 'development',
      },
      docker: {
        description: `Extra docker arguments to pass to the 'docker run command'`
      },
      image: {
        description: `Name of the docker image to use. Defaults to tap-name:tap-version.`
      },
      mounts: {
        description: `List of key names or folder paths to mount into the docker container`
      },
      name: {
        allowed: [ 'components', 'core', 'tap' ],
        description: 'Name of the docker container to run',
        enforced: true,
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "name" argument is "tap"',
      },
    },
  }
}
