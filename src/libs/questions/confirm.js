const { isStr, isObj } = require('jsutils')

const defConfirm = {
  type: 'confirm',
  name: 'confirm',
  message: 'Are you sure?',
  default: false
}


const confirm = question => {
  return isStr(question)
    ? { ...defConfirm, message: question }
    : isObj(question)
      ? { ...defConfirm, ...question }
      : { ...defConfirm }
}


module.exports = {
  confirm,
}