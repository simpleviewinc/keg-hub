const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const rootDir = require('app-root-path')
const { handleError } = require('../terminal')

/**
 * Holds all spawned processes
*/
const spawns = []

/**
 * Adds a spawned process to the spawns array
 * @param {Object} spawn - child spawned process
 *
 * @returns {void}
 */
const addSpawn = spawn => spawns.push(spawn)

// Set the cmd options to ensure script is allowed to update permissions
const cmdOpts = {
  groupID: process.getgid(),
  userID: process.getuid(),
  maxBuffer: Infinity,
  env: process.env,
  cwd: rootDir.path,
  stdio: 'inherit',
}

/**
 * Clean up all child spawn processes
 * @param {string} event - event the called the cleanup method
 * @param {string|number} exitCode - exit type ( clean || error )
 *
 * @returns {void}
 */
const cleanup = (event, exitCode) => spawns.map(spawn => spawn.kill(event))

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
 * Executes a task from the command line
 * @param {string} taskName - Name of the task to run
 * @param {Object} task - Metadata for the task to run
 * @param {Object} tasks - All tasks that can be run
 *
 * @returns {string} - standard output of the run task
 */
const executeCmd = async (taskName, task, tasks) => {
  try {
    if(!task.cmd)
      throw new Error(`No command to run for task ${taskName}`)
    
    const command = !task.args
      ? task.cmd
      : `${task.cmd} ${task.args.join(' ')}`

    const { stdout, stderr } = await cmdExec(command, cmdOpts)
    if(stderr) throw new Error(stderr)

    return stdout
  }
  catch(e){
    handleError(e)
  }
}

/**
 * Spawns a new process, and runs the passed in task in that process
 * @param {string} taskName - Name of the task to run
 * @param {Object} task - Metadata for the task to run
 * @param {Object} tasks - All tasks that can be run
 *
 * @returns {Object} - spawned process
 */
const spawnCmd = async (taskName, task, tasks) => {

  const { cmd, args, options } = task
  const spawnProc = spawn(cmd, args || [], { ...cmdOpts, ...options })
  
  // Set the default if stdio is not attached
  spawnProc.stdout && spawnProc.stdout.setEncoding('utf-8')
  spawnProc.stderr && spawnProc.stderr.setEncoding('utf-8')
  
  // Add sub process is killed when parent process is killed
  addSpawn(spawnProc)

  return spawnProc
}


module.exports = {
  addSpawn,
  executeCmd,
  spawnCmd,
}