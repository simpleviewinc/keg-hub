const { buildModel } = require('../models/buildModel')

/**
 * Builds the model for a password question
 * @param {string|Object} question - the
 *
 * @return {Promise<number>} the index of the selected option. Returns -1 if input failed validation
 */
const password = question => {
  return buildModel('password', question)
}

module.exports = {
  password,
}

