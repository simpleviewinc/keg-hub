module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc', 'd' ],
    tasks: {
      sync: require('./sync'),
    },
    description: 'Keg Docker specific tasks',
    example: 'keg docker <command> <options>'
  }
}