module.exports = {
  compose: {
    name: 'compose',
    alias: [ 'comp', 'cmp', 'cm' ],
    tasks: {
      build: require('./build'),
      up: require('./up'),
    },
    description: `Runs docker compose command`,
    example: 'keg docker compose <command> <options>'
  }
}