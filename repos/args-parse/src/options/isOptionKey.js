const { buildMatchTypes } = require('../utils/buildMatchTypes')

/*
 * Returns true if `str` is a valid key in the optionSchemas
 * @param {string} str 
 * @param {Object} optionSchemas - the 'options' object in the schema for a task
 * @returns {boolean} true if `str` is a valid option key to use with the task on the command line
 */
const isOptionKey = (str, optionSchemas) => {
  // loop over every option definition, and check if its match types include the string str
  return Object
    .entries(optionSchemas)
    .some(([key, schema]) => {
      const validKeys = buildMatchTypes(key, key[0], schema.alias)
      return validKeys.includes(str)
    })
}


module.exports = {
  isOptionKey
}
