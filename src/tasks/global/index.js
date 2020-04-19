module.exports = {
  global: {
    name: 'global',
    alias: [ 
      'commit',
      'git',
      'glob',
      'gl',
      'open',
      'pull',
      'push',
      'set',
      'setup'
    ],
    tasks: {
      test: require('./test'),
      ...require('./config'),
      ...require('./git'),
      ...require('./setup'),
      ...require('./open')
    },
    action: require('./global'),
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}