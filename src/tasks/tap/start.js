const { reduceObj, get } = require('jsutils')
const { buildDockerCmd } = require('KegDocker')
const { getArguments, getTapPath, logVirtualIP } = require('KegUtils')
const { spawnCmd, executeCmd } = require('KegProc')
const { DOCKER } = require('KegConst')
const defMounts = get(DOCKER, 'VOLUMES.DEV_DEFAULTS', {})

/**
 * Gets the folders to mount from the passed in mounts argument
 * @param {string} mounts - Comma separated Folders to mount
 * @param {string} env - Environment to run the container in
 *
 * @returns {Array} - Groups of name repos or folder paths to mount into the container
 */
const getMounts = (mounts, env) => {
  const custom = mounts ? mounts.split(',') : []

  return !env || env === 'development'
    ? defMounts.concat(custom)
    : custom
}

/**
 * Start a docker container for the tap
 * Mount the tap into the docker container at a consistent location
 *   - Gets tap location from global config
 * Mount keg-core into node_modules of tap
 *   - tap/node_modules/keg-core
 *   - Get hosts keg-core location from global config
 * Mount re-theme / tap-resolver into keg-core node_modules
 *   - tap/node_modules/keg-core/node_modules/*
 *   - Get hosts re-theme / tap-resolver location from global config
 * Start the expo server type based on params
 *   - Native || Web
 * Expose the ports to allow host machine to access the server in the container
 *
 * Default Folder Path mounts:
 * Tap Mount
 * -v ${dirs.tap}/:/keg/tap 
 * Core Mount
 * -v ${dirs.core}/:/keg/tap/node_modules/sv-keg
 * ReTheme Mount
 * -v ${reThemeDir}/:/keg/tap/node_modules/sv-keg/node_modules/re-theme
 * Components Mount
 * -v ${keg-components}/:/keg/tap/node_modules/sv-keg/node_modules/keg-components
 */
const startTap = async (args) => {

  const { command, options, tasks, globalConfig } = args

  const { name, env, docker, mounts, image } = getArguments(args)

  const location = getTapPath(globalConfig, name)
  const { version } = require(`${location}/package.json`)
  const dockerCmd = buildDockerCmd(globalConfig, {
    name,
    location,
    docker,
    cmd: `run`,
    img: image || `${name}:${version}`,
    mounts: getMounts(mounts, env)
  })

  await logVirtualIP()

  await spawnCmd(dockerCmd, location)

}

module.exports = {
  name: 'start',
  alias: [ 'st', 'run' ],
  action: startTap,
  description: `Runs a tap in a docker container`,
  example: 'keg tap start <options>',
  options: {
    name: { 
      description: 'Name of the tap to run. Must be a tap linked in the global config',
      required: true,
    },
    env: {
      description: 'Environment to start the Docker container in',
      default: 'development',
    },
    docker: {
      description: `Extra docker arguments to pass to the 'docker run command'`
    },
    mounts: {
      description: `List of key names or folder paths to mount into the docker container`
    },
    image: {
      description: `Name of the docker image to use. Defaults to tap-name:tap-version.`
    },
  }
}