const path = require('path')
const { deepFreeze, keyMap } = require('jsutils')
const cliRootDir = path.join(__dirname, '../../../')
const { getDefaultENVs } = require('./getDefaultENVs')
const { getFoldersSync, pathExistsSync } = require('../../libs/fileSys/fileSys')

/**
 * Get the default envs for the environment
 * @object
 */
const defaultENVs = getDefaultENVs(cliRootDir)

/**
 * All folders in the CONTAINERS_PATH that have a Dockerfile
 * @array
 */
const images = getFoldersSync(defaultENVs.CONTAINERS_PATH)
  .filter(folder => pathExistsSync(path.join(
    defaultENVs.CONTAINERS_PATH,
    folder,
    `Dockerfile`
  )))

/**
 * Allowed Context types for running docker commands
 * @object
 * <br/> Normal docker commands need to be run from the repos folder
 * <br/> Docker Compose commands should be run from their respective containers folder
 * <br/> One of these types should be added to the task model that defines the docker command
 */
const locationContext = keyMap([
  'repo',
  'containers'
], true)

/**
 * Maps keys from the docker cli response to a different key value
 * @object
 */
const cliKeyMap = {
  Names: 'name'
}

/**
 * Maps keys from the mutagen yml config to work with the mutagen cli
 * <br/> The cli keys are not a 1:1 with the yml config keys
 * @object
 */
const mutagenMap = {
  mode: 'syncMode',
}

module.exports = deepFreeze({
  images,
  cliKeyMap,
  mutagenMap,
  cliRootDir,
  defaultENVs,
  locationContext,
  dockerEnv: process.env.DOCKER_ENV || process.env.NODE_ENV || 'local',
})

