const { get, isStr, isObj } = require('jsutils')
const { printHeader } = require('./printHeader')
const colors = require('colors/safe')


const showCommandInfo = (infoName, infoDescription, infoSpacer) => {
  infoDescription && console.log(
    colors.brightCyan(`${infoSpacer}${infoName}:`),
    colors.brightWhite(infoDescription)
  )
}

const showHelpHeader = header => {
  header = header === false
    ? header
    : header || `Keg-CLI Help`

  if(!header) return

  printHeader(header)
  console.log(colors.brightBlue(`Available Commands: `))
  console.log(``)
}

const showCommandHeader = (key, header, spacer, dblSpacer) => {
  const subSpacer = header && spacer || dblSpacer

  console.log(colors.gray(`${subSpacer}Command:`), colors.brightGreen.bold(`${key}`))
}

const showSubCommands = (task, dblSpacer) => {

  if(!isObj(task) || !isObj(task.tasks)) return

  console.log(``)
  console.log(colors.brightBlue(`${dblSpacer}  Sub Commands:`))
  showHelp(task.tasks, false, `${dblSpacer}`)

}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showHelp = (tasks, header, spacer) => {
  spacer = spacer || '  '
  const dblSpacer = `${spacer}${spacer}`

  showHelpHeader(header)

  Object.keys(tasks).map(key => {
    if(isStr(tasks[key])) return

    showCommandHeader(key, header, spacer, dblSpacer)
    
    const infoSpacer = header && dblSpacer || `${dblSpacer}  `
    
    showCommandInfo('Description', get(tasks, `${key}.description`, ''), infoSpacer)
    showCommandInfo('Example', get(tasks, `${key}.example`, ''), infoSpacer)
    showCommandInfo('Alias', get(tasks, `${key}.alias`, []).join(' | '), infoSpacer)

    showSubCommands(tasks[key], dblSpacer)

  })
  console.log(``)
}


module.exports = {
  showHelp
}