const { isStr, isObj } = require('@keg-hub/jsutils')
const models = require('./models')

/**
 * Builds a model matching the required inquirer model for a question
 * @function
 * @param {Object|string} model - Model type to build
 * @param {Object|string} question - Model type overrides
 *
 * @returns {Object} - Built inquirer question model
 */
const buildModel = (model, question) => {
  model = isObj(model) ? model : (isStr(model) && models[model]) || {}

  return isStr(question)
    ? { ...models.defaultModel, ...model, message: question }
    : isObj(question)
      ? { ...models.defaultModel, ...model, ...question }
      : { ...models.defaultModel, ...model }
}

module.exports = {
  buildModel
}