module.exports = {
  tap: {
    name: 'tap',
    alias: [ 'taps' ],
    tasks: {
      ...require('./build'),
      ...require('./destroy'),
      ...require('./link'),
      ...require('./new'),
      ...require('./start'),
      ...require('./stop'),
      ...require('./unlink'),
    },
    action: require('./tap'),
    description: 'Keg CLI tap specific tasks',
    example: 'keg tap <command> <options>'
  }
}