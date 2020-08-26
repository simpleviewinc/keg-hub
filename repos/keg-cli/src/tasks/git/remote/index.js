
module.exports = {
  remote: {
    name: 'remote',
    alias: [ 'rmt' ],
    description: 'Run git commands on keg and tap repos!',
    example: 'keg git remote <options>',
    tasks: {
      ...require('./add'),
      ...require('./list'),
      ...require('./remove'),
    }
  }
}