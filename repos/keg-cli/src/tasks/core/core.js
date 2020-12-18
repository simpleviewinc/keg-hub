module.exports = {
  core: {
    name: 'core',
    alias: [ 'cor', 'cr' ],
    tasks: {
      ...require('./action'),
      ...require('./attach'),
      ...require('./build'),
      ...require('./destroy'),
      ...require('./package'),
      ...require('./pullrequest'),
      ...require('./restart'),
      ...require('./start'),
      ...require('./stop'),
      ...require('./sync'),
    },
    description: 'Keg CLI core specific tasks',
    example: 'keg core <command> <options>'
  }
}
