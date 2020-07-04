const path = require('path')
const { Logger } = require('KegLog')
const { get, mapObj } = require('@ltipton/jsutils')
const { getRootDir } = require('KegUtils')
const { ask, input } = require('KegQuestions')
const { CLI_ROOT } = require('KegConst/constants')
const { loadTemplate } = require('KegUtils/template')
const { generalError } = require('KegUtils/error/generalError')
const { writeFile, pathExists, mkDir } = require('KegFileSys')


const getParentPath = (parent, name) => {
  return parent === 'keg'
    ? path.join(CLI_ROOT, `src/tasks/${name}`)
    : path.join(CLI_ROOT, `src/tasks/${parent}`)
}

const saveTask = async (content, { parent, name }) => {

  const parentPath = getParentPath(parent, name)
  const [ errParent, parentExists ] = await pathExists(parentPath)

  const taskFile = path.join(parentPath, `${name}.js`)
  const [ errTask, taskExists ] = await pathExists(taskFile)

  taskExists && generalError(`Can not create task. File already exists => ${taskFile}`)

  let doWrite = false

  if(!parentExists){

    const doMkDir = await ask.confirm({
      message: `Confirm, create task parent folder => ${parentPath}`,
      default: true
    })

    if(!doMkDir) return Logger.warn(`Generate task cancelled!`) || Logger.empty()
    const [ errMake, madeDir ] = await mkDir(parentPath)
    
    errMake && generalError(errMake)

    doWrite = true
  }

  doWrite = doWrite || await ask.confirm({
    message: `Confirm, write task file => ${taskFile}`,
    default: true,
  })

  if(!doWrite) return Logger.warn(`Generate task cancelled!`) || Logger.empty()

  await writeFile(taskFile, content)
  Logger.success(`Generated new task => ${taskFile}`)

}

/**
 * Generates a task file from a template file
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const generateTask = async args => {
  const { command, options, globalConfig, params } = args

  const filled = await loadTemplate('task', params)
  
  await saveTask(filled, params)

}

module.exports = {
  name: 'task',
  alias: [ 'tk' ],
  action: generateTask,
  description: `Generates scaffolding for a new CLI Task!`,
  example: 'keg generate task <options>',
  options: {
    name: {
      description: 'Name of the new task',
      example: 'keg generate task --name my-task',
      ask: {
        type: 'input',
        message: 'Enter the task name',
      },
      require: true,
    },
    description: {
      description: 'Explanation of what the task does',
      example: 'keg generate task --description \"My task does a thing\"',
      ask: {
        type: 'input',
        message: 'Enter the task description',
      },
      require: true,
    },
    parent: {
      description: 'Parent task of the new task',
      example: 'keg generate task --parent task-parant',
      ask: {
        type: 'input',
        message: 'Enter the task parent',
      },
      require: true,
    }
  }
}