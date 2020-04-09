module.exports = {
  tap: {
    name: 'tap',
    alias: [ 'taps' ],
    tasks: {
      build: require('./build'),
      link: require('./link'),
      new: require('./new'),
      start: require('./start'),
    },
    action: require('./tap'),
    description: 'Keg CLI tap specific tasks',
    example: 'keg tap <command> <options>'
  }
}