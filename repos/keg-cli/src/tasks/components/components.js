
module.exports = {
  components: {
    name: 'components',
    alias: [ 'comps', 'comp' ],
    tasks: {
      ...require('./action'),
      ...require('./add'),
      ...require('./attach'),
      ...require('./build'),
      ...require('./destroy'),
      ...require('./stop'),
      ...require('./start'),
      ...require('./storybook'),
      ...require('./sync'),
    },
    description: 'Keg CLI components specific tasks',
    example: 'keg components <command> <options>'
  }
}
