const { Logger } = require('KegLog')
const { getServiceArgs } = require('./getServiceArgs')
const { getRemotePath } = require('../getters/getRemotePath')
const { runInternalTask } = require('../task/runInternalTask')
const { get, isArr, isStr, isObj } = require('@keg-hub/jsutils')
const { buildExecParams } = require('../docker/buildExecParams')
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
  isStr(cmd) && allCmds.unshift(cmd)

  return allCmds.reduce(async (toResolve, cmd) => {
    await toResolve

    Logger.highlight(`Running ${ dependency } sync action:`, `"${ cmd }"`)

    // Run the docker exec task for each cmd
    return runInternalTask('tasks.docker.tasks.exec', {
      ...serviceArgs,
      params: {
        ...serviceArgs.params,
        context: cmdContext,
        ...buildExecParams(
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
const getSyncActions = (actions, syncActions, dependency) => {
  return !isArr(syncActions) || !syncActions.length || !isObj(actions)
    ? null
    : syncActions.includes('all')
      ? Object.entries(actions)
          .reduce((allActions, [ name, meta ]) => {
            return allActions.concat({ ...meta, name })
          }, [])
      : syncActions.reduce((runActions, action) => {
          const valid = isObj(actions[action])
          !valid && Logger.error(`\nAction "${action}" does not exist for "${ dependency }"\n`)

          return valid
            ? runActions.concat([ { ...actions[action], name: action } ])
            : runActions
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
  const configActions = await getMutagenConfig({
    __injected: params.__injected,
    context: cmdContext,
    configPath: 'actions'
  })

  if(!configActions) return

  // Get the container, and the repo to be synced
  const { container, dependencyName, syncActions } = normalizeSyncData(serviceArgs)

  // Get the actions to run based on the dependency
  const actions = getSyncActions(configActions[dependencyName], syncActions, dependencyName)

  // If there's no container or actions, then just return
  if(!container || !isArr(actions) ) return actionContext

  // Run the actions for the dependency
  await runSyncActions(serviceArgs, cmdContext, dependencyName, actions)

  return actionContext
}

module.exports = {
  syncActionService
}
