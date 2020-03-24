const { get } = require('jsutils')
const { moveDirectory } = require('../../utils')

const coreCommand = args => {
  const { command, options, tasks, globalConfig } = args

  if(!options.length) return moveDirectory(globalConfig, 'core')

}

module.exports = coreCommand