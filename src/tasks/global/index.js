module.exports = {
  global: {
    name: 'global',
    alias: [ 'glob', 'gl', 'pull', 'push', 'commit' ],
    tasks: {
      sync: require('./syncGlobalConfig'),
      test: require('./test'),
      ...require('./git')
    },
    action: require('./global'),
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}