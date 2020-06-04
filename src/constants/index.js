const constants = require('./constants')
const docker = require('./docker')
const patterns = require('./patterns')
const packages = require('./packages')

module.exports = {
  ...constants,
  ...docker,
  ...patterns,
  ...packages
}