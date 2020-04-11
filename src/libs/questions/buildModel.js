const { isStr, isObj } = require('jsutils')

const defModel = {
  name: 'question',
}

const buildModel = (model, question) => {
  return isStr(question)
    ? { ...defModel, ...model, message: question }
    : isObj(question)
      ? { ...defModel, ...model, ...question }
      : { ...defModel, ...model }
}

module.exports = {
  buildModel
}