const fs = require('fs')
const path = require('path')
const { isStr, isObj } = require('jsutils')
const { showHelp } = require('./showHelp')
const { Logger } = require('./logger')

/**
 * Prints CLI unknown command when invalid command is used
 * @param {string} command - Invalid passed in command
 * @param {boolean} unknown - If it's an unknown command
 *
 * @returns {void}
 */
const showNoTask = (command, unknown=true) => {
  console.log(``)
  Logger.error(`Unknown command => ${command}`)
  Logger.green(`Type "keg help' to see all known commands.`)
  console.log(``)
}


/**
 * Helper to print an error
 *
 * @param {Error|Object} err - Error that was thrown
 *
 * @returns {void}
 */
const handleError = err => {
  Logger.header(`Keg-CLI Error:`)
  Logger.error(`  ${err.stack}`)
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