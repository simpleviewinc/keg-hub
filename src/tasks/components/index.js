module.exports = {
  components: {
    name: 'components',
    alias: [ 'comp' ],
    tasks: {
      add: require('./add'),
    },
    action: require('./components'),
    description: 'Keg CLI components specific tasks',
    example: 'keg components <command> <options>'
  }
}