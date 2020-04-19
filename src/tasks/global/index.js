module.exports = {
  global: {
    name: 'global',
    alias: [  'glob', 'gl' ],
    tasks: {
      ...require('./config'),
      ...require('./general'),
      ...require('./git'),
      ...require('./setup'),
    },
    action: require('./global'),
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>'
  }
}