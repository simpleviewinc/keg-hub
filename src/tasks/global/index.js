module.exports = {
  global: {
    name: 'global',
    alias: [ 'glob', 'gl' ],
    tasks: {
      sync: require('./syncGlobalConfig'),
      test: require('./test'),
    },
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}