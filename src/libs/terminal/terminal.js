const fs = require('fs')
const path = require('path')
const { isStr, isObj } = require('jsutils')
const rootDir = require('app-root-path')
const { printHeader } = require('./printHeader')
const { showHelp } = require('./showHelp')

/**
 * Prints CLI unknown command when invalid command is used
 * @param {string} command - Invalid passed in command
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showNoTask = (command, options, tasks) => {
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
  showNoTask,
  spacer
}