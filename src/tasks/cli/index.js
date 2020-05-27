module.exports = {
  cli: {
    name: 'cli',
    alias: [],
    tasks: {
      ...require('./print'),
    },
    action: require('./cli'),
    description: 'Keg CLI specific tasks',
    example: 'keg cli <command> <options>'
  }
}