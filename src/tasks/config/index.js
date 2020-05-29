module.exports = {
  config: {
    name: 'config',
    alias: [ 'conf' ],
    tasks: {
      ...require('./editor'),
      ...require('./open'),
      ...require('./print'),
      ...require('./set'),
      ...require('./sync'),
    },
    description: 'Keg CLI config specific tasks',
    example: 'keg config <command> <options>'
  }
}
