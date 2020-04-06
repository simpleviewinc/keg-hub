module.exports = {
  tap: {
    name: 'tap',
    alias: [ 'taps' ],
    tasks: {
      build: require('./build'),
      new: require('./new'),
      start: require('./start'),
      link: require('./link'),
    },
    action: require('./tap'),
    description: 'Keg CLI tap specific tasks',
    example: 'keg tap <command> <options>'
  }
}