const { get, isStr } = require('@keg-hub/jsutils')
const { generalError } = require('KegUtils/error')
const CONSTANTS = require('KegConst/constants')
const { DOCKER } = require('KegConst/docker')
const { KEG_ENVS } = require('KegConst/envs')
const PATTERNS = require('KegConst/docker')

/**
 * Prints internal data of the Keg-CLI
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const printData = async args => {
  const { globalConfig, options, params, tasks } = args
  const { context, task } = params

  let toPrint
  switch(context){
    case 'constants':
    case 'const': {
      toPrint = CONSTANTS
      break
    }
    case 'containers':
    case 'cont': {
      toPrint = DOCKER.CONTAINERS
      break
    }
    case 'docker':
    case 'doc': {
      toPrint = DOCKER
      break
    }
    case 'env': {
      toPrint = KEG_ENVS
      break
    }
    case 'machine':
    case 'mach': {
      toPrint = DOCKER.MACHINE
      break
    }
    case 'patterns':
    case 'pattern':
    case 'pat': {
      toPrint = PATTERNS
      break
    }
    case 'base':
    case 'core':
    case 'proxy':
    case 'tap': {
      toPrint = get(DOCKER, `CONTAINERS.${context.toUpperCase()}`)
      // Throw early so we get the correct error
      !toPrint && generalError(`Could not find container data for "${ context }"`)
      break
    }
    case 'tasks': {
      toPrint = tasks
      break
    }
    case 'task': {
      // Add tasks key in-between task path if it doesn't exist
      let withTasks = task.indexOf('.tasks.') !== -1 ? task : task.split('.').join('.tasks.')
      toPrint = get(tasks, withTasks)

      // If it's an alias, then convert it to the real task
      if(isStr(toPrint)){
        const splitTask = withTasks.split('.')
        splitTask[splitTask.length -1] = toPrint
        toPrint = get(tasks, splitTask)
      }

      // Throw early so we get the correct error
      !toPrint && generalError(`Could not find task for path "${ withTasks }"`)
      break
    }
  }

  toPrint
    ? console.log(JSON.stringify(toPrint, null, 2))
    : generalError(
        `Invalid print context "${ context }". Must be one of ${ get(args, 'task.options.context.allowed', []).join(' | ') }`
      )

}

module.exports = {
  print: {
    name: 'print',
    alias: [ 'p' ],
    action: printData,
    description: `Prints out runtime data from the keg-cli`,
    example: 'keg cli print <options>',
    options: {
      context: {
        allowed: [
          'base',
          'constants',
          'const',
          'containers',
          'cont',
          'core',
          'docker',
          'doc',
          'env',
          'machine',
          'mach',
          'patterns',
          'pattern',
          'pat',
          'proxy',
          'tap',
          'tasks',
          'task',
        ],
        description: 'Context of what values to print',
        required: true,
      },
      task: {
        description: 'The path to a task on the tasks object when context is "task"',
        enforced: true,
      }
    }
  }
}
