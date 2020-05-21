
const { buildModel } = require('./buildModel')


const input = question => buildModel('input', question)

module.exports = {
  input,
}