const { get, isStr, isObj, mapObj } = require('jsutils')
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
  console.log(``)
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
const showSubTasks = (task, dblSpacer) => {

  if(!isObj(task) || !isObj(task.tasks) || !Object.keys(task.tasks).length)
    return console.log(``)

  console.log(``)
  console.log(colors.brightBlue(`${dblSpacer}  Sub Commands:`))
  showAllHelp(task.tasks, false, `${dblSpacer}`)

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
  desc && console.log(
    colors.brightCyan(`${infoSpacer}${name}:`),
    colors.brightWhite(desc)
  )
}

const showTaskOptions = (task, infoSpacer, dblSpacer) => {
  if(!task.options) return

  console.log('')
  console.log(colors.brightBlue(`${infoSpacer}Options:`))
  mapObj(task.options, (name, meta) => {
    const { description, enforced, required, alts } = isStr(meta)
      ? { description: meta }
      : meta

    console.log(
      infoSpacer,
      (required || enforced) && colors.red(` *`) || '  ',
      colors.brightCyan(`${name}:`),
      colors.brightWhite(meta.description)
    )
  })

}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 * @param {boolean} header - Should print the help header
 * @param {string} spacer - Extra space added to the beginning of the line
 *
 * @returns {void}
 */
const showAllHelp = (tasks, header, space) => {

  showHelpHeader(header, `Available Commands: `)
  const { spacer } = getSpacers(space, header)

  Object.keys(tasks)
    .map(key => 
      !isStr(tasks[key]) &&
        showTaskHelp(
          tasks[key],
          false,
          spacer
        )
    )

  console.log(``)
}


/**
 * Prints information about a single task 
 *
 * @param {*} task - Task to print formation about
 * @param {*} header - Should print the help header
 * @param {*} space - space from start of line
 */
const showTaskHelp = (task, header, space) => {

  const { spacer, dblSpacer, infoSpacer } = getSpacers(space)

  showHelpHeader(header)
  showTaskHeader(task.name, header, spacer, dblSpacer)
  showTaskInfo(task, infoSpacer)
  showTaskOptions(task, infoSpacer, dblSpacer)
  showSubTasks(task, dblSpacer)

}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showHelp = (tasks, task=false) => {
  task ? showTaskHelp(task) : showAllHelp(tasks)

  console.log(``)
}

module.exports = {
  showAllHelp,
  showTaskHelp,
  showHelp
}