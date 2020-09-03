const { Logger } = require('KegLog')
const { getServiceArgs } = require('./getServiceArgs')
const { loadValuesFiles } = require('KegConst/docker/loaders')


const { generalError } = require('../error/generalError')
const { getRemotePath } = require('../getters/getRemotePath')
const { runInternalTask } = require('../task/runInternalTask')
const { buildExecParams } = require('../docker/buildExecParams')
const { findDependencyName } = require('../helpers/findDependencyName')

const { get, isArr, isStr, isObj, checkCall } = require('@keg-hub/jsutils')
const { buildContainerContext } = require('../builders/buildContainerContext')

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
const runActionCmds = (serviceArgs, cmdContext, dependency, action) => {

  // Get the cmd || cmds to run
  const { cmds, cmd, ...actionParams } = action

  // Normalize the cmds array
  const allCmds = isArr(cmds) ? cmds : isStr(cmds) ? [ cmds ] : []
  isStr(cmd) && allCmds.unshift(cmd)

  return allCmds.reduce(async (toResolve, toRun) => {
    await toResolve

    Logger.highlight(`Running action:`, `"${ cmd }"`)

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
        cmd: toRun,
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
const runActions = (serviceArgs, cmdContext, dependency, actions) => {
  return actions.reduce(async (toResolve, action) => {
    await toResolve
    return runActionCmds(serviceArgs, cmdContext, dependency, action)
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
const getActions = (actions, actionToRun, dependency) => {
  return !isArr(actionToRun) || !actionToRun.length || !isObj(actions)
    ? null
    : actionToRun.includes('all')
      ? Object.entries(actions)
          .reduce((allActions, [ name, meta ]) => {
            return allActions.concat({ ...meta, name })
          }, [])
      : actionToRun.reduce((runActions, action) => {
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
const actionService = async (args, argsExt) => {

  const serviceArgs = getServiceArgs(args, argsExt)
  const { params } = serviceArgs
  const actionContext = await buildContainerContext(serviceArgs)

  // TODO:
  // Get the actions from the values.yml files
  const { container, env, __injected } = params
  const actions = await loadValuesFiles({
    env,
    container,
    loadPath: 'actions',
    __internal: __injected,
  })

  console.log(`---------- actions ----------`)
  console.log(actions)

  // Compare them to the passed in actions
  // Get only the passed in actions, in the correct order
  // const actionsToRun = getActions(actions, get(serviceArgs, 'params.action'))

  // Run the actions on the container
  // await runActions(serviceArgs, actionContext.cmdContext, action, actions)

}

module.exports = {
  actionService
}
