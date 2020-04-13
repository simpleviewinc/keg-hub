module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd' ],
    tasks: {
      sync: require('./sync'),
      compose: require('./compose'),
    },
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>'
  }
}