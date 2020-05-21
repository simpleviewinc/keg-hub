const dockerSync = args => {
  
}

module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'sy' ],
    action: dockerSync,
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