const { isStr, isObj } = require('jsutils')
const models = require('./models')

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