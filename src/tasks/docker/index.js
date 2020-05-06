module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd' ],
    tasks: {
      ...require('./build'),
      ...require('./compose'),
      ...require('./machine'),
      ...require('./sync'),
    },
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>'
  }
}