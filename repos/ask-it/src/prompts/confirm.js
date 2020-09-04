const { buildModel } = require('../models/buildModel')
const { isStr, isObj } = require('@keg-hub/jsutils')

const defModel = {
  type: 'confirm',
  name: 'confirm',
  message: 'Are you sure?',
  default: false
}

const confirm = question => {
  return buildModel(defModel, question)
}

module.exports = {
  confirm,
}