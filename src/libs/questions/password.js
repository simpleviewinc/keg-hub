const { buildModel } = require('./buildModel')

const password = question => {
  return buildModel('password', question)
}

module.exports = {
  password,
}

