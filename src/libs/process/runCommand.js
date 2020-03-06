const fs = require('fs')
const path = require('path')
const killProc = require('tree-kill')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const rootDir = require('app-root-path')
const { handleError, Logger } = require('../terminal')
const { checkCall, pickKeys } = require('jsutils')

const NO_OP = () => {}
const SEPARATOR = process.platform === "win32" ? ";" : ":"
const NM_BIN_PATH = path.resolve("../../../node_modules/.bin") + SEPARATOR + process.env.PATH

// ---------------------- Spawn Helpers ---------------------- //

/**
 * Holds all spawned processes
*/
const spawns = {}

/**
 * Gets a cached child procesess from the processes object.
 * @param {string|number} procId - id of the child process to get
 * @returns {Object} - found child process
 */
const getSpawn = id => spawns[id]

/**
 * Adds a spawned process to the spawns array
 * @param {Object} spawn - child spawned process
 *
 * @returns {void}
 */
const addSpawn = spawn => {
  spawn.pid
    ? (spawns[spawn.pid] = spawn)
    : Log.error(`Could not add spawn without a pid`, spawn)
}

/**
 * Clean up all child spawn processes
 * @param {string} event - event the called the cleanup method
 *
 * @returns {void}
 */
const cleanup = event => Object.keys(spawns).map(id => spawns[id].kill(event))

/**
 * Catch all exit events, and run cleanup
*/
Array.from([
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'uncaughtException',
  'SIGTERM'
]).map(event => process.on(event, cleanup.bind(null, event)))

/**
 * Default helper to ensure the child processes get killed
 * @param {*} _ - NOT USED
 * @param {string|number} procId - id of the child process to force kill
 *
 * @returns {number} - 0 for successful exit or 1 for error on exit
 */
const defKillProc = async (_, spawnId) => {
  try {
    killProc(spawnId, 'SIGKILL')
    return 0
  }
  catch (e){
    Log.error(e.stack)
    return 1
  }
  
}

/**
 * Default helper to kill a child spawned processe
 * @param {string|number} procId - id of the child process to force kill
 *
 * @returns {number} - 0 for successful exit or 1 for error on exit
 */
const killSpawn = id => defKillProc('', id)

// ---------------------- Command Defaults ---------------------- //

/**
 * Default command options
*/
const cmdOpts = {
  groupID: process.getgid(),
  userID: process.getuid(),
  maxBuffer: Infinity,
  env: { ...process.env, PATH: NM_BIN_PATH },
  cwd: rootDir.path,
  stdio: 'pipe',
}

/**
 * Default event handlers for spawned processes
*/
const defEvents = {
  onExit: NO_OP,
  onStdErr: defKillProc,
  onError: defKillProc,
  onStdOut: Logger.log,
  onClose: NO_OP
}

// ---------------------- Command Event Handlers ---------------------- //

const evtWrap = (cb, spawnId, event) => (data => checkCall(cb, data, spawnId))

/**
 * Adds listener events to child process found from the procId or the child param.
 * @param {Object} childSpawn - spawned process to attach events to
 * @param {Object} events - Events to attach to the child process
 * @param {function} events.onExit - function to call when the process exits
 * @param {function} events.onStdOut - function called on stdout of the child process
 * @param {function} events.onStdErr - function called on stderr of the child process
 * @param {function} events.onError - function called on error of the child process
 *
 * @returns {void}
 */
const addEvents = (childSpawn, events) => {

  const cbEvents = { ...defEvents, ...events }

  if (!childSpawn)
    return Logger.error(`addEvents method requires a child process as the first argument!`)

  childSpawn.on('exit', evtWrap(cbEvents.onExit, childSpawn.pid, 'exit'))

  childSpawn.on('close',  evtWrap(cbEvents.onClose, childSpawn.pid, 'close'))

  childSpawn.on('error', evtWrap(cbEvents.onError, childSpawn.pid, 'error'))

  childSpawn.stdout &&
    childSpawn.stdout.on('data', evtWrap(cbEvents.onStdOut, childSpawn.pid, 'stdout'))

  childSpawn.stderr &&
    childSpawn.stderr.on('data', evtWrap(cbEvents.onStdErr, childSpawn.pid, 'stderr'))

}


// ---------------------- Command Runners ---------------------- //

/**
 * Spawns a new process, and runs the passed in task in that process
 * @param {Object} params - Options to run the spawned process
 *
 * @returns {Object} - spawned process
 */
const spawnCmd = async params => {

  const { cmd, args, options } = params
  const spawnProc = spawn(cmd, args || [], { ...cmdOpts, ...options })
  
  // Set the default if stdio is not attached
  spawnProc.stdout && spawnProc.stdout.setEncoding('utf-8')
  spawnProc.stderr && spawnProc.stderr.setEncoding('utf-8')

  // Store and setup spawn events
  addSpawn(spawnProc)
  addEvents(spawnProc, pickKeys(params, [ 'onClose', 'onStdErr', 'onStdOut', 'onError', 'onExit' ]))

  return spawnProc
}

/**
 * Executes a task from the command line
 * @param {Object} toRun - Options needed to run a command
 * @param {string} toRun.cmd - The command to run
 * @param {Array} toRun.args - Array of arguments to pass to the command
 *
 * @returns {string} - standard output of the run task
 */
const executeCmd = async toRun => {
  try {
    if(!toRun.cmd)
      throw new Error(`No command to run for toRun ${toRun.name}`)
    
    const command = !toRun.args
      ? toRun.cmd
      : `${toRun.cmd} ${toRun.args.join(' ')}`

    const { stdout, stderr } = await cmdExec(command, cmdOpts)
    if(stderr) throw new Error(stderr)

    return stdout
  }
  catch(e){
    handleError(e)
  }
}

module.exports = {
  addSpawn,
  executeCmd,
  getSpawn,
  killSpawn,
  spawnCmd,
}