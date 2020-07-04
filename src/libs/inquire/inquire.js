// See more info at https://github.com/SBoudrias/Inquirer.js

const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()
const { questionModels } = require('./models')

const { isArr, limbo } = require('@ltipton/jsutils')

// TODO: figure out how to best handle ask errors
const showAskError = (error) => {
  console.log(error)
}

const separator = () => new inquirer.Separator()

const ask = async (questions) => {

  questions = isArr(questions) && questions || [ questions ]
  const [ error, answers ] = await limbo(prompt(questions))

  return error
    ? showAskError(error)
    : answers

}

module.exports = {
  ask,
  questionModels,
  separator,
}