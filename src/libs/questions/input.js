const { isStr, isObj } = require('jsutils')
const { buildModel } = require('./buildModel')

const defModel = {
  type: 'input',
  name: 'input',
  message: 'Enter text',
}

const input = question => {
  return buildModel(defModel, question)
}

module.exports = {
  input,
}