const { get, isStr, isObj, mapObj, isArr } = require('@svkeg/jsutils')
const { Logger } = require('./logger')
const colors = require('colors/safe')

/**
 * Builds different spacer types to better format the task information
 * @param {string} space - Initial start space ( used when printing sub tasks )
 * @param {boolean} header - Is the help header being printed ( adds extra space when it's not )
 *
 * @returns {Object} - built spacers
 */
const getSpacers = (space, header) => {
  spacer = space || '  '
  const dblSpacer = `${spacer}${spacer}`
  const infoSpacer = header && dblSpacer || `${dblSpacer}  `

  return { spacer, dblSpacer, infoSpacer }
}

/**
 * Checks if the Help header should be printed
 * and prints it, if needed
 *
 * @param {boolean|string} header - Should the help header be printed
 * @param {string} subHeader - Sub header to print under the header
 */
const showHelpHeader = (header, subHeader) => {
  header = header === false
    ? header
    : header || `Keg-CLI Help`

  if(!header) return

  Logger.header(header)
  subHeader && console.log(colors.brightBlue(subHeader))
  Logger.empty()
}

/**
 * Prints the tasks info header
 * @param {string} key - Name of the task to print
 * @param {boolean} header - Should print the help header
 * @param {string} spacer - Extra space added to the beginning of the line
 * @param {string} dblSpacer - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showTaskHeader = (key, header, spacer, dblSpacer) => {
  const subSpacer = header && spacer || dblSpacer

  Logger.empty()
  console.log(
    colors.gray(`${subSpacer}Command:`),
    colors.brightGreen.bold(`${key}`)
  )
}

/**
 * Checks if a task has sub tasks and tries to print them when they exist
 * @param {Object} task - Task to have it's sub tasks printed
 * @param {string} infoSpacer - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showSubTasks = (task, opts={}) => {

  Logger.empty()

  // If not a valid task, just return
  if(!isObj(task) || !isObj(task.tasks) || !Object.keys(task.tasks).length)
    return

  const { dblSpacer } = opts
  Logger.log(colors.brightBlue(`${dblSpacer}  Sub Commands:`))

  // Print the help for sub-tasks
  showAllHelp(
    task.tasks,
    { ...opts, header: false, space: `${dblSpacer}` }
  )

}

/**
 * Collects and prints all available task info
 * @param {Object} task - Item to have it's info printed
 * @param {string} infoSpacer - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showTaskInfo = (task, infoSpacer) => {
  showTaskInfoItem('Alias', get(task, `alias`, []).join(' | '), infoSpacer)
  showTaskInfoItem('Description', get(task, `description`, ''), infoSpacer)
  showTaskInfoItem('Example', get(task, `example`, ''), infoSpacer)
}

/**
 * Prints specific info about a specific task
 * @param {string} name - Name of the info
 * @param {string} desc - description of the info
 * @param {string} infoSpacer - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showTaskInfoItem = (name, desc, infoSpacer) => {
  desc && Logger.pair(`${infoSpacer}${name}:`, desc)
}

const showTaskOptions = (task, infoSpacer, dblSpacer) => {
  if(!task.options) return

  Logger.empty()
  console.log(colors.brightBlue(`${infoSpacer}Options:`))
  mapObj(task.options, (name, meta) => {
    const { description, enforced, require, required, alts } = isStr(meta)
      ? { description: meta }
      : meta

    console.log(
      infoSpacer,
      (require || required || enforced) && colors.red(` *`) || '  ',
      colors.brightCyan(`${name}:`),
      colors.brightWhite(meta.description)
    )
  })

}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 * @param {Object} [opts={}] - Options for printing help
 * @param {boolean} opts.header - Should print the help header
 * @param {string} opts.space - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showAllHelp = (tasks, opts={}) => {
  const { header, space } = opts

  showHelpHeader(header, `Available Commands: `)
  const { spacer } = getSpacers(space, header)

  Object.keys(tasks)
    .map(key => 
      !isStr(tasks[key]) && 
        showTaskHelp(
          tasks[key],
          { ...opts, spacer, header: false, subtasks: false }
        )
    )

  Logger.empty()
}

/**
 * Displays the detail info (if any) of a specific option from a task (alias, description, example)
 * @example keg core start --attached -h
 * @param {Object} task 
 * @param {string} option - option item from the task
 * @param {string} infoSpacer - spacing
 * @param {string} dblSpacer - spacing
 */
const showTaskOptionDetail = (task, option, infoSpacer, dblSpacer) => {

  if(!task.options) return

  let validKey
  // 1. find matching option key in task
  mapObj(task.options, (key) => {
    if (option.includes(key)) {
      return validKey = key
    }
  })
  // 2. if found, display the info 
  if (validKey) {
    Logger.empty()
    console.log(colors.brightBlue(`${infoSpacer}Option: ${validKey}`))
    return showTaskInfo(task.options[validKey], `  ${infoSpacer}`)
  }

  // if no key found, default to showing all options
  showTaskOptions(task, infoSpacer, dblSpacer)

}

/**
 * Prints information about a single task 
 *
 * @param {Object} task - Task to print formation about
 * @param {Object} [opts={}] - Options for printing help
 * @param {boolean} opts.header - Should print the help header
 * @param {string} opts.space - space from start of line
 * @param {boolean} opts.subtasks - prints task's subtasks if true
 */
const showTaskHelp = (task, opts={}) => {
  const { header, space, subtasks=true } = opts

  const { spacer, dblSpacer, infoSpacer } = getSpacers(space)

  showHelpHeader(header)
  showTaskHeader(task.name, header, spacer, dblSpacer)
  showTaskInfo(task, infoSpacer)

  // if opt is array, then we passed in an option to the help cmd
  isArr(opts) && opts.length > 1
    ? showTaskOptionDetail(task, opts[0], infoSpacer, dblSpacer)
    : showTaskOptions(task, infoSpacer, dblSpacer)
  

  subtasks && showSubTasks(task, { ...opts, dblSpacer })
}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 * @param {Object} task - Single task to show help for
 * @param {Object} opts - Options for the show help output
 *
 * @returns {void}
 */
const showHelp = ({ tasks, task=false, options={} }) => {
  task ? showTaskHelp(task, options) : showAllHelp(tasks, options)

  Logger.empty()

  // Return true, so we know showHelp executed
  return true
}

module.exports = {
  showHelp
}