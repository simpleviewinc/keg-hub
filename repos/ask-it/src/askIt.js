const { isArr } = require('@keg-hub/jsutils')
const inquirer = require('inquirer')
const { input } = require('./prompts/input')
const { confirm } = require('./prompts/confirm')
const { password } = require('./prompts/password')

/**
 * Creates a separator from inquire
 * @returns {*} - inquirer separator
 */
const separator = () => new inquirer.Separator()

/**
 * Asks a question or multiple questions to a user from the terminal
 * @function
 * @param {Object|Array} questions - Questions to ask the user in the inquirer question format
 *
 * @returns {Object} - Answers to questions as key / value pairs of names and answers
 */
const ask = questions => {
  questions = isArr(questions) ? questions : [ questions ]

  return inquirer.prompt(questions)
}

/**
 * Asks a single question, then get the value of the answer
 * @param {object} model - Model the the question to ask match inquirer's model spec
 * @param {string} name - Name of the question to ask
 *
 * @returns {*} - Response from the asked question
 */
const singleQuestion = async (model, name) => {
  const answers = await ask({ ...model, name })

  return answers[name]
}

/**
 * Helper to ask a single confirm question
 * @param {Object|string} question - Confirm question to ask
 *
 * @returns {*} - Response from the asked question
 */
ask.confirm = question => singleQuestion(confirm(question), 'confirm')

/**
 * Helper to ask a single input question
 * @param {Object|string} question - Input question to ask
 *
 * @returns {*} - Response from the asked question
 */
ask.input = question => singleQuestion(input(question), 'input')

/**
 * Helper to ask for a password
 * @param {Object|string} question - Input question to ask
 *
 * @returns {*} - Response from the asked question
 */
ask.password = question => singleQuestion(password(question), 'password')

module.exports = {
  ask,
  separator
}