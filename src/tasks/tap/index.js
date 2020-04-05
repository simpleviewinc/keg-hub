module.exports = {
  tap: {
    name: 'tap',
    alias: [ 'taps' ],
    tasks: {
      new: require('./new'),
      start: require('./start'),
    },
    action: require('./tap'),
    description: 'Keg CLI tap specific tasks',
    example: 'keg tap <command> <options>'
  }
}