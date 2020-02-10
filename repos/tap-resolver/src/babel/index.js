const setupBabel = require('./setupBabel')
const validateBabel = require('./validateBabel')

module.exports = {
  ...setupBabel,
  ...validateBabel
}