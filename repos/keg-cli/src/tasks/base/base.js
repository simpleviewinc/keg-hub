

module.exports = {
  base: {
    name: 'base',
    alias: [],
    description: 'Keg docker base image tasks ',
    example: 'keg base <command> <options>',
    tasks: {
      ...require('./build'),
      ...require('./destroy'),
      ...require('./run'),
    },
  }
}
