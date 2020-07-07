
const { buildModel } = require('../models/buildModel')


const input = question => buildModel('input', question)

module.exports = {
  input,
}