const { Logger } = require('KegLog')
const { getServiceArgs } = require('./getServiceArgs')
const { generalError } = require('../error/generalError')
const { getRemotePath } = require('../getters/getRemotePath')
const { runInternalTask } = require('../task/runInternalTask')
const { get, isArr, isStr, isBool, isObj } = require('@svkeg/jsutils')
const { findDependencyName } = require('../helpers/findDependencyName')
const { getMutagenConfig } = require('KegUtils/getters/getMutagenConfig')
const { buildContainerContext } = require('../builders/buildContainerContext')

/**
 * Normalizes the sync arguments to pass to the sync action
 * @function
 * @param {Object} serviceArgs - arguments passed from the runTask method
 *
 * @returns {Array} - Array of Promises of each sync action
 */
const normalizeSyncData = serviceArgs => {
  const { params } = serviceArgs
  const mutagen = get(serviceArgs, '__internal.containerContext.mutagen', {})

  const { env, force, dependency, context, ...syncParams } = params

  const syncData = { ...syncParams, ...mutagen }
  if(!syncData.remote && !syncData.remotePath) return {}

  const remotePath = syncData.remote.includes('/')
    ? syncData.remote
    : remotePath || getRemotePath(context, dependency, remote)

  const dependencyName = findDependencyName(dependency, remotePath)
  return { ...syncData, remotePath, dependencyName }
}

/**
 * Gets the arguments to pass to the docker exec command
 * @function
 * @param {Boolean} serviceArgs.detach - Should the action run in detached mode
 * @param {Object} action - Sync action to run
 *
 * @returns {Array} - Array of Promises of each sync action
 */
const getExecParams = ({ detach }, action) => {
  const { workdir, location, ...actionParams } = action
  const detachMode = isBool(detach) ? detach : actionParams.detach

  return {
    ...actionParams,
    detach: detachMode,
    workdir: workdir || location,
    options: detachMode ? '' : '-it',
  }

}

/**
 * Runs the sync actions defined in the mutagen.yml sync config
 * <br/>Runs each cmd in series, one after the other
 * @function
 * @param {Object} serviceArgs - arguments passed from the runTask method
 * @param {string} cmdContext - Context of the container to sync with
 * @param {Array} action - Action to run in the container for the sync
 *
 * @returns {Array} - Array of Promises of each sync action
 */
const runSyncCmds = (serviceArgs, cmdContext, dependency, action) => {

  // Get the cmd || cmds to run
  const { cmds, cmd, ...actionParams } = action

  // Normalize the cmds array
  const allCmds = isArr(cmds) ? cmds : isStr(cmds) ? [ cmds ] : []

  return allCmds.reduce(async (toResolve, cmd) => {
    await toResolve

    Logger.highlight(`Running ${ dependency } sync action:`, `"${ cmd }"`)

    // Run the docker exec task for each cmd
    return runInternalTask('tasks.docker.tasks.exec', {
      ...serviceArgs,
      params: {
        ...serviceArgs.params,
        context: cmdContext,
        ...getExecParams(
          serviceArgs.params,
          actionParams
        ),
        cmd,
      },
    })

  }, Promise.resolve())

}

/**
 * Runs the sync actions defined in the mutagen.yml sync config
 * <br/>Runs each action in series, one after the other
 * @function
 * @param {Object} serviceArgs - arguments passed from the runTask method
 * @param {string} cmdContext - Context of the container to sync with
 * @param {Array} actions - Actions to run in the container for the sync
 *
 * @returns {Array} - Array of Promises of each sync action
 */
const runSyncActions = (serviceArgs, cmdContext, dependency, actions) => {
  return actions.reduce(async (toResolve, action) => {
    await toResolve
    return runSyncCmds(serviceArgs, cmdContext, dependency, action)
  }, Promise.resolve())
}

/**
 * Converts the actions from object to array
 * <br/>Sets the name of each action to equal the action key
 * <br/>If action is passed, only returns that action in an array
 * @function
 * @param {Object} actions - Actions to run in the container for the sync
 * @param {string} action - Name of the action to run
 *
 * @returns {Array} - Array actions to run
 */
const getSyncActions = (actions, action, dependency) => {
  return action
    ? !isObj(actions[action])
      ? Logger.error(`\nSync action "${action}" does not exist for "${ dependency }"\n`)
      : [ { ...actions[action], name: action } ]
    : isObj(actions) && Object.entries(actions)
      .reduce((allActions, [ name, meta ]) => {
        return allActions.concat({ ...meta, name })
      }, [])
}

/**
 * Starts a mutagen sync between local and a docker container
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 * @param {string} params.container - Name of the container to run ( core / components / tap )
 * @param {string} params.tap - Name of tap, if container arg value is `tap`
 * @param {string} params.location - Location where the command should be run
 *
 * @returns {void}
 */
const syncActionService = async (args, argsExt) => {

  const serviceArgs = getServiceArgs(args, argsExt)
  const actionContext = await buildContainerContext(serviceArgs)

  const { cmdContext, context, id } = actionContext
  const { globalConfig, params } = serviceArgs

  // Get the actions for the sync
  const syncActions = await getMutagenConfig({
    __injected: params.__injected,
    context: cmdContext,
    configPath: 'actions'
  })

  if(!syncActions) return

  // Get the container, and the repo to be synced
  const { container, dependencyName, syncAction } = normalizeSyncData(serviceArgs)

  // Get the actions to run based on the dependency
  const actions = getSyncActions(syncActions[dependencyName], syncAction, dependencyName)

  // If there's no container or actions, then just return
  if(!container || !isArr(actions) ) return actionContext

  // Run the actions for the dependency
  await runSyncActions(serviceArgs, cmdContext, dependencyName, actions)

  return actionContext
}

module.exports = {
  syncActionService
}