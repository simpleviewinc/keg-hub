const { isObj, isStr, get } = require('@ltipton/jsutils')
const { ask, buildModel } = require('askIt')
const { getConfig } = require('../utils/getConfig')

/**
 * Checks if we should ask the user for the missing value to an option
 * @function
 * @param {string} key - Params key the value should be mapped to
 * @param {Object} meta - Info about the option from the task
 *
 * @returns {Object} - Response from ask lib
 */
const optionsAsk = async (key, meta) => {
  const config = getConfig()

  // Check if we should ask for the meta value
  if(!meta.ask || !get(config, 'settings.task.optionsAsk')) return meta.default
  
  // Build the default model for options
  // Default type to input
  const defModel = {
    name: key,
    type: 'input',
    default: get(meta, 'ask.default', meta.default),
    message: `Please enter value for ${ key } option:`,
  }

  // Build the question model to be asked
  // ask can be a string || and object
  // If it's an object, it should follow an question lib model
  const question = isObj(meta.ask)
    ? { ...defModel, ...meta.ask }
    : isStr(meta.ask)
      ? { ...defModel, message: meta.ask }
      : { ...defModel }

  // Build the model for the question, then ask it
  const answers = await ask(buildModel(question.type, question))

  // Get the answer from the returned answers object, and return it
  return answers[key]

}


module.exports = {
  optionsAsk
}
