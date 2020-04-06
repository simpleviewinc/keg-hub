const { isArr } = require('jsutils')
const inquirer = require('inquirer')
const { confirm } = require('./confirm')

/**
 * Asks a question or multiple questions to a user from the terminal
 * @param {Object|Array} questions - Questions to ask the user in the inquirer question format
 *
 * @returns {Object} - Answers to questions as key / value pairs of names and answers
 */
const ask = questions => {
  questions = isArr(questions) ? questions : [ questions ]

  return inquirer.prompt(questions)
}

ask.confirm = async question => {
  const toAsk = confirm(question)
  const answers = await ask({ ...toAsk, name: 'confirm' })

  return answers.confirm
}

module.exports = {
  ask
}