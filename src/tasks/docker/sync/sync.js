const dockerSync = args => {
  console.log(`---------- docker sync task ----------`)
}

module.exports = {
  sync: {
    name: 'sync',
    alias: [ 'sy', 'ds' ],
    action: dockerSync,
    tasks: {
      clean: require('./clean'),
      destroy: require('./destroy'),
      list: require('./list'),
      start: require('./start'),
      stop: require('./stop'),
    },
    description: `Runs docker sync command`,
    example: 'keg docker sync <command> <options>'
  }
}