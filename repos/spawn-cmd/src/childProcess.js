const path = require('path')
const spawn = require('cross-spawn')
const killProc = require('tree-kill')
const rootDir = require('app-root-path').path
const { exitError, errorHandler } = require('./utils')
const { logData, mapObj, reduceObj, checkCall, deepMerge, isFunc } = require('@keg-hub/jsutils')

/**
 * Cache to hold child processes
*/
const processes = {}

/**
 * Array to capture process exits and call handleExit method
 * <br/> The process to handel the exits for
 * @function
 * @param {Object} proc - The process to add the exit events too
 * @param {Object} childProc - The child process where the onExit event came from
 * @param {Object} onExit - Callback method to run when exit is called
 *
 * @returns {void}
*/
const initExitHandlers = () => {
  
  Array.from([
    'exit',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
    'SIGTERM'
  ])
    // Loop over the events, and add each one to the current process
    // This way we watch for any time the current process is killed
    .map(event => process.on(event, async exitCode => {
      // If exit was already called, return
      if(process.__spOnExitCalled) return

      // Add our flag, so we don't call this again
      process.__spOnExitCalled = true

      // Loop over all child process, and kill them
      mapObj(processes, (procId, childProc) => {
        // If exit was already called, return
        if(childProc.__spOnExitCalled) return

        // Add our flag, so we don't call this again
        childProc.__spOnExitCalled = true
        logData(`Cleaning up child processes, On event: ${event}`)

        // Force kill all child processes
        killProc(procId, 'SIGKILL')
      })

    }))

}

/**
 * Default spawn options.
 * @object
 * Passes all ENVs to the child process.
 * Sets cwd to the root directory.
*/
const spawnOpts = {
  gid: process.getgid(),
  uid: process.getuid(),
  env: process.env,
  cwd: rootDir,
  stdio: 'inherit'
}

/**
 * Default helper to ensure the child processes get killed
 * @param {*} _ - NOT USED
 * @param {string|number} procId - id of the child process to force kill
 */
const defKillProc = async (_, procId) => {
  try {
    return await forceKill(procId)
  }
  catch (e){
    console.error(e.stack)
    return 1
  }
}

/**
 * Default event options.
 * @object
*/
const defEvents = {
  onError: { name: 'error' },
  onClose: { name: 'close' },
  onStdErr: { name: 'stderr', childKey: 'stderr', sub: 'data' },
  onStdOut: { name: 'stdout', childKey: 'stdout', sub: 'data' },
  onExit: { method: defKillProc,  name: 'exit' },
}

/**
 * Wraps a function in a checkCall to ensure the event callback is a function
 * @function
*/
const evtWrap = (cb, procId, event) => (data => checkCall(cb, data, procId))

/**
 * Adds listener events to child process found from the procId or the child param.
 * @function
 * @param {string|number} procId - id of the child process to add the events to
 * @param {Object} events - Events to attach to the child process
 * @param {function} events.onExit - function to call when the process exits
 * @param {function} events.onStdOut - function called on stdout of the child process
 * @param {function} events.onStdErr - function called on stderr of the child process
 * @param {function} events.onError - function called on error of the child process
 * @param {Object} child - child process to attach events to
 *
 * @returns {void}
 */
const addEvents = (procId, cbEvents, child) => {

  child = child || get(procId)
  if (!child) return logData(`No child process found with ID: ${procId}`)

  mapObj(defEvents, (key, { name, method, childKey, sub }) => {

    const validChild = childKey ? Boolean(child[childKey]) : true
    const callback = cbEvents[key] || method
    if(!validChild || !isFunc(callback)) return

    sub
      ? child[childKey].on(sub, evtWrap(callback, procId, name))
      : child.on(name, evtWrap(callback, procId, name))

  })

}

/**
 * Setup a child process with default settings, and adds to the process cache.
 * @function
 * @param {Object} childProc - child process to setup
 *
 * @returns {void}
 */
const setupProc = (childProc) => {
  const procId = childProc.pid
  processes[procId] = childProc
  processes[procId].stdout && processes[procId].stdout.setEncoding('utf-8')
  processes[procId].stderr && processes[procId].stderr.setEncoding('utf-8')
}

/**
 * Gets a cached child procesess from the processes object.
 * @function
 * @param {string|number} procId - id of the child process to get
 *
 * @returns {Object} - found child process
 */
const get = procId => {
  return processes[procId]
}

const afterKill = (procId, res) => {
  delete processes[procId]

  return checkCall(res, true)
}

/**
 * Kills the cached process with the passed in procId.
 * @function
 * @param {string|number} procId - id of the cached child processes
 * @param {Object} child - child process to kill
 *
 * @returns {Promise} - resolves to true if no errors are thrown
 */
const kill = (procId, child) => {
  child = child || get(procId)
  if (!child) return logData(`No child process found with ID: ${procId}`)

  // Cache the id
  if (procId !== child.pid) procId = child.pid

  return new Promise((res, rej) => {
    try {
      // Try to kill the child process
      return killProc(child.pid, err => {
        // If there's an error, try to force kill it ( kill -9 )
        err ? rej(err) : afterKill(procId, res)
      })
    }
    catch (err){
      return rej(err, procId)
    }
  })
    .catch(e => (forceKill(procId)))
    .finally(data => data)
}

/**
 * Force kills a process ( kill -9 pid )
 * @function
 * @param {string|number} procId - id of the process to kill
 *
 * @returns {Promise} - resolves to true if no errors are thrown
 */
const forceKill = procId => {
  return new Promise((res, rej) => {
    try {
      killProc(procId, 'SIGKILL', err => (err ? rej(err) : afterKill(procId, res)))
    }
    catch (err){
      errorHandler(err)

      return rej(err, procId)
    }
  })
}

/**
 * Kills all child_processes cached in processes object.
 * @function
 *
 * @returns {Promise} - resolves to true if no errors are thrown
 */
const killAll = async () => {
  try {
    await Promise.all(mapObj(processes, (key, value) => kill(key, value)))

    return true
  }
  catch (err){
    errorHandler(err)

    return false
  }
}

/**
 * Runs a child process in the command line.
 * @function
 * @param {Object} params - options for the child process
 * @param {string} params.cmd - cmd to run
 * @param {string} params.args - arguments to pass when the command is run
 * @param {function} params.onExit - function to call when the process exits
 * @param {function} params.onStdOut - function called on stdout of the child process
 * @param {function} params.onStdErr - function called on stderr of the child process
 * @param {Object} params.childOpts - options to pass to the child process
 *
 * @returns {void}
 */
const create = params => {

  params.log && logData('Creating child process...')

  const { cmd, args, options } = params
  const procOpts = deepMerge(spawnOpts, options)
  const childProc = spawn(cmd, args || [], procOpts)

  if(!childProc.pid){
    logData(`Child process created, but is no longer running!`, `warn`)
    return childProc
  }

  // Detach the child from the parent if procOpts.detached is set, and has own IO
  procOpts.detached &&
    procOpts.stdio !== 'inherit' &&
    childProc.unref()

  setupProc(childProc)
  addEvents(childProc.pid, params, childProc)
  initExitHandlers()

  params.log && logData(`Created child process with PID: ${childProc.pid}`)

  return childProc
}

module.exports = {
  create,
  get,
  kill,
  killAll
}
