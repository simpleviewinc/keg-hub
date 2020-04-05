module.exports = {
  global: {
    name: 'global',
    alias: [ 'commit', 'glob', 'gl', 'pull', 'push', 'setup' ],
    tasks: {
      test: require('./test'),
      ...require('./config'),
      ...require('./git'),
      ...require('./setup')
    },
    action: require('./global'),
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}