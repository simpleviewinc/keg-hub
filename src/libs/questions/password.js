const { buildModel } = require('./buildModel')

const defModel = {
  type: 'password',
  name: 'password',
  message: 'Please enter the password',
}

const password = question => {
  return buildModel(defModel, question)
}

module.exports = {
  password,
}

