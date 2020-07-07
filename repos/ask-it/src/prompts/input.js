
const { buildModel } = require('KegModels/buildModel')


const input = question => buildModel('input', question)

module.exports = {
  input,
}