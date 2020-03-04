const { isStr, isObj } = require('jsutils')
const { printHeader } = require('./printHeader')
const colors = require('colors/safe')

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
  header && console.log(colors.brightBlue(`Available Commands: `))
  header && console.log(``)
  

  const allTasks = Object.keys(tasks)
  allTasks.map(key => {
    if(isStr(tasks[key])) return

    const subSpacer = header && spacer || dblSpacer

    console.log(colors..gray(`${subSpacer}Command:`), colors.brightGreen.bold(`${key}`))
    
    const infoSpacer = header && dblSpacer || `${dblSpacer}  `
    
    tasks[key].description && console.log(
      colors.brightCyan(`${infoSpacer}Description:`),
      colors..brightWhite(`${tasks[key].description}`)
    )
    tasks[key].example && console.log(
      colors.brightCyan(`${infoSpacer}Example:`),
      colors.brightWhite(`${tasks[key].example}`)
    )
      

    if(isObj(tasks[key]) && isObj(tasks[key].tasks)){
      console.log(``)
      console.log(colors.brightBlue(`${dblSpacer}Sub Commands:`))
      showHelp(tasks[key].tasks, false, `${dblSpacer}`)
    }

  })
  console.log(``)
}


module.exports = {
  showHelp
}