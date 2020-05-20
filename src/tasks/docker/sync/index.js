module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'sy' ],
    tasks: {
      clean: require('./clean'),
      destroy: require('./destroy'),
      start: require('./start'),
      stop: require('./stop'),
    },
    description: `Runs docker sync command`,
    example: 'keg docker sync <command> <options>'
  }
}