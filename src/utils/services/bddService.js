const path = require('path')
const { Logger } = require('KegLog')
const { get } = require('@ltipton/jsutils')
const { copyFile } = require('KegFileSys/fileSys')
const { composeService } = require('./composeService')
const { mutagenService } = require('./mutagenService')
const { generalError } = require('../error/generalError')
const { getRepoPath } = require('../getters/getRepoPath')
const { runInternalTask } = require('../task/runInternalTask')
const { findPathByName } = require('../helpers/findPathByName')
const { checkPathExists } = require('../helpers/checkPathExists')
const { SYNC_PREFIXES: { BDD_SERVICE } } = require('KegConst/constants')
const { getContainerConst } = require('../docker/getContainerConst')
const { throwNoPathExists } = require('../error/throwNoPathExists')

/**
 * Gets the paths needed to create mutagen syncs
 * <br/>Also ensures the paths exist
 * @param {string} location - Path to build the sync options for
 *
 * @returns {Object} - Contains feature and steps local and remote locations 
 */
const buildSyncPaths = async location => {

  // Get the path for where the features and steps folders should exist
  const featPath = path.join(location, 'features')
  const stepsPath = path.join(location, 'steps')

  // Check that the feat and the steps folders exist
  const featExists = await checkPathExists(featPath)
  const stepsExists = await checkPathExists(stepsPath)
  
  // If neither one exist, then throw
  !featExists && !stepsExists && throwNoPathExists(!stepsExists ? stepsPath : featPath)

  // Check that the feat and the steps docker path ENVS exist
  // These should be defined in the regulators values file
  const docFeatPath = getContainerConst('regulator', 'env.DOC_FEATURES_PATH')
  const docStepsPath = getContainerConst('regulator', 'env.DOC_STEPS_PATH')

  !docFeatPath && !docStepsPath && throwNoPathExists(!docStepsPath ? docStepsPath : docFeatPath)

  return {
    features: { local: featPath, remote: docFeatPath, name: `regulator-features` },
    steps: { local: stepsPath, remote:docStepsPath, name: `regulator-steps` }
  }

}

/**
 * Get the context path from the globalConfig, then use it as the location
 * @param {string} location - Path to search for a BDD tests folder
 *
 * @returns {Object} - Contains feature and steps local and remote locations 
 */
const searchForBDDPath = async location => {

  // Ensure the root location exists locally, otherwise throw
  const rootExists = await checkPathExists(location)
  !rootExists && throwNoPathExists(location)

  Logger.empty()
  Logger.log(`Searching location for features folder...`)

  // Search for the features folder within the location path
  const [ foundPath ] = await findPathByName(location, 'features', {
    type: 'folder',
    exclude: [ 'reports' ],
  })

  // Ensure we found a path to use
  ;(!foundPath || !foundPath.length) && throwNoPathExists(
    `for the features folder`,
    `The ${ context } at path ${ location }`
  )

  // Get the parent directory
  const parentDir = path.join(foundPath, '../')

  Logger.log(`Found features, building sync paths...`)
  Logger.empty()

  // Build the sync paths from the parent dir
  return buildSyncPaths(parentDir)

}

/**
 * Gets the local and remote path data to sync base on passed in params
 * @param {string} params.context - Context or name of repo to get the location of
 * @param {string} params.location - Local path of the location to sync
 *
 * @returns {Object} - Contains feature and steps local and remote locations 
 */
const getPathsToSync = ({ context, location }) => {
  return location
    ? searchForBDDPath(location)
    : searchForBDDPath(getRepoPath(context))
}

/**
 * Calls the mutagen sync service with arguments needed to create a sync
 * @param {string} args - Arguments of the original task
 * @param {string} argsExt - Extra Arguments to override the originals
 * @param {string} sync - Sync data for creating the mutagen sync
 *
 * @returns {*} - Response from the mutagen sync service
 */
const createSync = (args, argsExt, { local, remote, name }) => {
  return mutagenService(
    { 
      ...args,
      params: {
        ...args.params,
        local,
        remote,
        name: `${ BDD_SERVICE }-${ name }`
      }
    },
    argsExt
  )
}

/**
 * Builds the ignore options for the keg-regulators features and steps
 * <br>Those paths are handled by other syncs
 * @param {string} params - Params of the original task
 * @param {string} params.context - Context or name of repo to get the location of
 * @param {string} params.location - Local path of the location to sync
 *
 * @returns {string} - Build options string as required by mutagen
 */
const buildIgnoreOpts = ({ context, location }) => {
  return (location && location !== contextPath) || context !== 'regulator'
    ? `--ignore=/tests/features --ignore=/tests/steps`
    : null
}

/**
 * Starts keg-regulator with docker-compose
 * <br/>Creates mutagen syncs of the features and steps folder based on the context || tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const bddService = async (args, { context:cmdContext, container, tap, cmd  }) => {
  const { globalConfig, params } = args
  const { context, location } = params

  // Step 1. Remove any current bdd service syncs
  await runInternalTask('mutagen.tasks.clean', {
    ...args,
    params: {
      ...params,
      context: `${ BDD_SERVICE }-`,
      force: true,
    }
  })

  // Step 2. Copy the run.sh file from the keg-cli/containers/regulator repo
  const contextPath = getRepoPath(cmdContext)

  // 2.1 Get the sync paths before starting the container
  // Finding the syncs paths can take a while
  // This way we already have the paths, so we can start the syncs sooner
  const syncPaths = await getPathsToSync(params)

  // Step 3. Run docker-compose up task to start the regulator
  const containerContext = await composeService(
    { 
      ...args,
      params: {
        ...params,
        follow: false,
        service: 'mutagen',
        // Pass in the ignore options 
        // To ignore the features and steps folders of the keg-regulator repo
        options: buildIgnoreOpts(contextPath, params)
      }
    },
    { context: cmdContext, container }
  )

  // Step 4. Create syncs for the passed in context
  const extArgs = { context: cmdContext, containerContext }

  // Build the mutagen syncs for the context/location repos features and steps folders
  await createSync(args, extArgs, syncPaths.features)
  await createSync(args, extArgs, syncPaths.steps)

  // Step 5. Connect to the keg-regulator container and run the mini-cli
  return runInternalTask('tasks.docker.tasks.exec', {
    ...args,
    __internal: { containerContext },
    params: {
      ...params,
      cmd: params.cmd || cmd || `sh run.sh`,
      context: cmdContext,
    },
  })

}


module.exports = {
  bddService
}