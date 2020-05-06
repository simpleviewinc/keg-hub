module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd' ],
    tasks: {
      ...require('./build'),
      ...require('./compose'),
      ...require('./container'),
      ...require('./machine'),
      ...require('./run'),
      ...require('./sync'),
    },
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>'
  }
}