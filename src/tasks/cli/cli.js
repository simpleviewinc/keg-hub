const { moveDirectory } = require('../../utils')

const coreCommand = args => {
  const { command, options, tasks, globalConfig } = args

  if(!options.length) return moveDirectory(globalConfig, 'cli')

}

module.exports = coreCommand