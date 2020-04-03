module.exports = {
  components: {
    name: 'components',
    alias: [ 'comp' ],
    tasks: {
      add: require('./add'),
      storybook: require('./storybook'),
    },
    action: require('./components'),
    description: 'Keg CLI components specific tasks',
    example: 'keg components <command> <options>'
  }
}