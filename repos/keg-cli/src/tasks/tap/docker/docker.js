
module.exports = {
  docker: {
    name: 'docker',
    alias: [ 'doc' ],
    description: 'Keg CLI tap docker specific tasks',
    example: 'keg tap docker <command> <options>',
    tasks: {
      ...require('./exec'),
      ...require('./copy'),
    },
  }
}
