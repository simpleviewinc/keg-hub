const fs = require('fs')
const path = require('path')
const { isStr, isObj } = require('jsutils')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const rootDir = require('app-root-path')

/**
 * Helper to log out CLI message header
 * @param {string} title
 *
 * @returns {void}
 */
const printHeader = title => {
  const middle = `              ${title}              `

  const line = middle.split('').reduce((line, item, index) => {
    line+=' '

    return line
  })

  console.log(``)
  console.log(line.underline.brightGreen)
  console.log(line)
  console.log(middle.brightGreen)
  console.log(line.underline.brightGreen)
  console.log(``)
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

    // console.log(``)
  })
  console.log(``)
}

/**
 * Prints CLI unknown command when invalid command is used
 * @param {string} command - Invalid passed in command
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showNoTask = (command, tasks) => {
  console.log(``)
  console.log(`Unknown command => ${command}`)
  console.log(``)

  return showHelp(tasks)
}


/**
 * Helper to print an error
 *
 * @param {Error|Object} err - Error that was thrown
 *
 * @returns {void}
 */
const handleError = err => {
  printHeader(`Keg-CLI Error:`)
  console.log(`  ${err.message}`)
  console.log('')
  process.exit(1)
}

/**
 * Adds listeners to the stdin, to allow capturing input from the user
 *
 * @param {function} cb - function to call when input is received
 *
 * @returns {void}
 */
const handleInput = cb => {
  process.stdin.on('data', cb)
  process.stdin.on('error', cb)
  process.stdin.on('exit', cb)
}

/**
 * Helper to align text when printing to the console
 *
 * @returns {string} - spacer text
 */
const spacer = () => `\n\t   `

module.exports = {
  handleError,
  handleInput,
  printHeader,
  showHelp,
  showNoTask,
  spacer
}