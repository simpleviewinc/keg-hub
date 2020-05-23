const constants = require('./constants')
const docker = require('./docker')
const patterns = require('./patterns')

module.exports = {
  ...constants,
  ...docker,
  ...patterns
}