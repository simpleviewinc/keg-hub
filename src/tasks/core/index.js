module.exports = {
  core: {
    name: 'core',
    alias: [ 'cor', 'cr' ],
    tasks: {
      ...require('./destroy'),
      ...require('./start'),
      ...require('./stop'),
    },
    action: require('./core'),
    description: 'Keg CLI core specific tasks',
    example: 'keg core <command> <options>'
  }
}