const { isStr, isObj } = require('jsutils')
const { printHeader } = require('./printHeader')

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showHelp = (tasks, header, spacer) => {
  spacer = spacer || '  '
  const dblSpacer = `${spacer}${spacer}`

  header = header === false
    ? header
    : header || `Keg-CLI Help`

  header && printHeader(`Keg-CLI Help`)
  header && console.log(`Available Commands: `.brightBlue)
  header && console.log(``)
  

  const allTasks = Object.keys(tasks)
  allTasks.map(key => {
    if(isStr(tasks[key])) return

    const subSpacer = header && spacer || dblSpacer

    console.log(`${subSpacer}Command:`.gray, `${key}`.brightGreen.bold)
    
    const infoSpacer = header && dblSpacer || `${dblSpacer}  `
    
    tasks[key].description && console.log(
      `${infoSpacer}Description:`.brightCyan,
      `${tasks[key].description}`.brightWhite
    )
    tasks[key].example && console.log(
      `${infoSpacer}Example:`.brightCyan,
      `${tasks[key].example}`.brightWhite
    )
      

    if(isObj(tasks[key]) && isObj(tasks[key].tasks)){
      console.log(``)
      console.log(`${dblSpacer}Sub Commands:`.brightBlue)
      showHelp(tasks[key].tasks, false, `${dblSpacer}`)
    }

  })
  console.log(``)
}


module.exports = {
  showHelp
}