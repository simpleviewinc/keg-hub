const { dockerCmd, compareItems, noItemError, cmdSuccess } = require('./helpers')
const { remove } = require('./commands')
const { isArr, toStr, isStr } = require('jsutils')

// Container commands the require an item argument of the container id or name
const containerItemCmds = [
  'commit',
  'inspect',
  'kill',
  'logs',
  'pause',
  'prune',
  'restart',
  'stop',
  'top',
  'unpause',
  'update'
]

/**
 * Helper to format the docker command call and options
 * Then calls the dockerCmd
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 *
 * @returns {*} - Response from the docker command call
 */
const runDockerCmd = (args={}, opts) => {
  opts = opts || args.opts
  return dockerCmd({
    asStr: true,
    ...args,
    opts: [ 'container' ].concat( isArr(opts) ? opts : isStr(opts) ? opts.split(' ') : [])
  })
}

/**
 * Calls the docker api and gets a list of current containers
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 *
 * @returns {Array} - JSON array of containers
 */
const list = (args={}) => {
  return runDockerCmd(args, [ 'ls', '-a' ])
}

/**
 * Helper to ensure the item exists, and calls dockerRunCmds
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {Object} cmd - Name of the command to run
 *
 * @returns {*} - Response from the docker command
 */
const runCmdForItem = async (args, cmd) => {
  if(!args.item) return noItemError(`docker.container.${ cmd }`, true)
  const res = await runDockerCmd(args, [ cmd, args.item ])

  return res && cmdSuccess(cmd)
}

/**
 * Creates container item commands based on command
 * @object
 */
const containerCmds = containerItemCmds.reduce((commands, command) => {
  commands[command] = args => runCmdForItem(args, command)
  return commands
}, {})

/**
 * Kills, then removes a docker container based on passed in arguments
 * @function
 * @param {string} args - Arguments used to kill and remove a container
 *
 * @returns {boolean} - If the Docker command successfully ran
 */
const destroy = async args => {
  await containerCmds.kill({ ...args, skipError: true, errResponse: false })
  const res = await removeContainer({ ...args, skipError: true, errResponse: false })

  return res && cmdSuccess('destroy')
}

/**
 * Removes a docker image based on passed in toRemove argument
 * @function
 * @param {string} args - Arguments used in the docker remove command
 *
 * @returns {string} - Response from the docker cli command
 */
const removeContainer = args => {
  if(!args.item) return noItemError(`docker.container.remove`, true)
  return remove({ ...args, type: 'container' })
} 

/**
 * Checks if an container already exists ( is built )
 * @function
 * @param {string} compare - Value to compare each container with
 * @param {string|function} doCompare - How to compare each container
 *
 * @returns {boolean} - Based on if the container exists
 */
const exists = async (compare, doCompare, format) => {
  // Get all current containers
  const containers = await list({ errResponse: [], format })

  // If we have containers, try to find the one matching the passed in argument
  return containers &&
    containers.length &&
    containers.some(container => compareItems(
      container,
      compare,
      doCompare,
      [ 'containerId', 'names' ]
    ))
}

module.exports = {
  ...containerCmds,
  destroy,
  exists,
  list,
  remove: removeContainer,
}