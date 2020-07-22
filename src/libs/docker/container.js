const { compareItems, noItemError, cmdSuccess, portAsJSON, getCmdParams } = require('./helpers')
const { remove, dockerCli, dynamicCmd, raw } = require('./commands')
const { isArr, toStr, isStr, deepMerge, checkCall } = require('@ltipton/jsutils')

// Container commands the require an item argument of the container id or name
const containerItemCmds = [
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
 * Then calls the dockerCli
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {*} - Response from the docker command call
 */
const runDockerCmd = (args={}, opts) => {
  opts = opts || args.opts
  return dockerCli({
    ...args,
    opts: [ 'container' ].concat(
      isArr(opts)
        ? opts
        : isStr(opts)
          ? opts.split(' ')
          : []
    )
  })
}

/**
 * Calls the docker api and gets a list of current containers
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {Array} - JSON array of containers
 */
const list = (args={}) => {
  const opts = isStr(args) ? { item: args, type: 'container' } : args
  return runDockerCmd({ format: 'json', ...opts }, [ 'ls', '-a' ])
}

/**
 * Removes all stopped containers
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {*} - Response from the docker cli command
 */
const clean = async args => {

  // Get all built containers
  const containers = await list()

  // Get all stopped containers
  const stopped = containers.reduce((ids, container) => {
    return container.status.indexOf('Exited') === 0
      ? ids.concat(container.id)
      : ids
  }, [])

  // If there are any stopped, then removed them
  return stopped.length && runDockerCmd(
    { ...args, format: undefined },
    [ 'rm' ].concat(stopped)
  )

}

/**
 * Helper to ensure the item exists, and calls dockerRunCmds
 * @function
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 * @param {string} cmd - Name of the command to run
 *
 * @returns {*} - Response from the docker command
 */
const runCmdForItem = async (args, cmd) => {
  if(!args.item) return noItemError(`docker.container.${ cmd }`, true)
  const res = await runDockerCmd(args, [ cmd, args.item ])

  return cmdSuccess(cmd, res)
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
 * @param {Object|string} [args={}] - Arguments to kill and remove a container || container name
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {boolean} - If the Docker command successfully ran
 */
const destroy = async (args={}) => {
  const opts = isStr(args) ? { item: args, type: 'container' } : args
  await containerCmds.kill({ ...opts, skipError: true, errResponse: false })
  const res = await removeContainer({
    ...opts,
    skipError: true,
    errResponse: false
  })

  return cmdSuccess('destroy', res)
}

/**
 * Removes a docker image based on passed in toRemove argument
 * @function
 * @param {Object|string} [args={}] - Arguments used in the docker remove command || Name of container
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 * @param {boolean} [shouldThrow=true] - Should an error be throw if the command fails
 *
 * @returns {string} - Response from the docker cli command
 */
const removeContainer = (args={}, shouldThrow=true) => {
  const opts = isStr(args)
    ? { item: args, type: 'container', skipError: !shouldThrow, shouldThrow }
    : args

  return opts.item
      ? remove({ ...opts, type: 'container' })
      : noItemError(`docker.container.remove`, opts.shouldThrow || shouldThrow)
} 

/**
 * Checks if an container already exists ( is built )
 * @function
 * @param {string} compare - Value to compare each container with
 * @param {string|function} doCompare - How to compare each container
 *
 * @returns {boolean} - Based on if the container exists
 */
const exists = async (compare, doCompare) => {
  compare = isArr(compare) ? compare : [ compare ]

  // Get all current containers
  const containers = await list({ errResponse: [], format: 'json' })

  const found = containers &&
    containers.length &&
    compare.map(cont => {
      // If we have containers, try to find the one matching the passed in argument
      return containers.some(container => compareItems(
        container,
        compare,
        doCompare,
        [ 'id', 'name' ]
      ))

    })

  return found && found.indexOf(false) === -1
    ? found[0]
    : false

}

/**
 * Connects to a running container, and runs a command
 * @function
 * @example
 * docker exec -it app /bin/bash
 * @param {string} args - Arguments used to connect to the container
 *
 * @returns {void}
 */
const exec = async (args, cmdOpts={}) => {
  const { cmd, container, item, location, opts } = args
  const options = isArr(opts) ? opts.join(' ') : opts
  const cont = container || item

  return raw(
    `exec ${ options } ${ cont } ${ cmd }`.trim(),
    cmdOpts,
    location
  )

}

/**
 * Creates an image from the state of a currently running container
 * @function
 * @example
 * docker container commit keg-base
 * @param {Object} args - Arguments used to modify the docker api call
 * @param {string} args.container - Name of the container to commit
 * @param {string} args.item - Same as args.container
 * @param {string} args.author - The author of the new docker image
 * @param {string} args.message - Message for the commit
 *
 * @returns {Array} - JSON array of containers
 */
const commit = async (args, cmdOpts={}) => {

  const { container, item, author, message, location, tag } = args
  const cont = container || item

  // Add any passed options
  let options = []
  message && ( options = options.concat([ '--message', message ]) )
  author && ( options = options.concat([ '--author', author ]) )

  // Build the commit command
  const cmd = `commit ${ options.join(' ').trim() } ${ cont } ${ tag }`.trim()

  // Run the docker commit command
  return raw(cmd, cmdOpts, location)
}

/**
 * Root docker container method to run docker container commands
 * @function
 * @param {Object} args - Options to pass to the docker container command
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {string|Array} - Response from docker cli
 */
const container = (args={}) => dynamicCmd(
  { type: 'container', ...(isStr(args) ? { item: args } : args) },
  'container'
)

const get = async nameOrId => {
  // Get all current containers
  const containers = await list({ errResponse: [], format: 'json' })

  return containers.reduce((item, container) => {
    return item 
      ? item
      : checkCall(() => {
          let match = container.name === nameOrId || container.id === nameOrId
          match = match || container.name.indexOf(`-${ nameOrId }`) === 0

          return match ? container : item
        })
  }, false)
}

/**
 * Gets the bound ports for a container, or the bound to port, if a port is passed in
 * @function
 * @param {string} nameOrId - Name of Id of the container to get the ports of
 * @param {string|number} [port] - Port to check if it's bound
 *
 * @returns {string|Array} - Response from docker cli
 */
const port = async (args, _port, _format, cmdOpts) => {
  const { item, port, format } = getCmdParams(args, { port: _port, format: _format || 'json' })

  const container = await get(item)
  if(!container) return false

  const opts = [ 'port', item ]
  port && opts.push(port)

  const portData = await dockerCli({ opts }, cmdOpts)
  
  return format === 'json'
    ? portAsJSON(portData, port)
    : portData

}

/**
 * Gets all currently running containers in json format
 * @function
 * @param {Object} args - Options to pass to the docker container command
 * @param {string} args.opts - Options used to build the docker command
 * @param {string} args.format - Format of the docker command output
 *
 * @returns {Array} - Array of objects of running containers
 */
const ps = (args, cmdOpts) => {
  return dockerCli({
    ...getCmdParams(args, { log: false, format: 'json' }),
    opts: [ 'ps' ]
  }, cmdOpts)
}

/**
 * Copies files or folders to and from a docker container
 * @function
 * @param {Object} args - Options to pass to the docker container command
 * @param {string} args.container - Options used to build the docker command
 * @param {string} args.local - Local path for the copy command
 * @param {string} args.remote - Remote path on the container for the copy command
 * @param {boolean} [args.fromRemote=true] - Copy from remote to local
 *
 * @returns {Array} - Array of objects of running containers
 */
const copy = ({ container, local, remote, fromRemote=true, ...args }, cmdOpts) => {
  const opts = fromRemote 
    ? [ 'cp', `${ container }:${ remote }`, local ]
    : [ 'cp', local, `${ container }:${ remote }` ]

  return dockerCli({ ...args, opts }, cmdOpts)
}


// Add the sub-methods to the root docker image method
Object.assign(container, {
  ...containerCmds,
  clean,
  commit,
  copy,
  destroy,
  exec,
  exists,
  get,
  list,
  remove: removeContainer,
  port,
  ps,
})

module.exports = container