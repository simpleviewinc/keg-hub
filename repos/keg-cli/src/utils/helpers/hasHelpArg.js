const { HELP_ARGS } = require('KegConst/constants')

const hasHelpArg = (arg) => (HELP_ARGS.indexOf(arg) !== -1)

module.exports = {
  hasHelpArg
}