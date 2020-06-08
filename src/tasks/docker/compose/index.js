module.exports = {
  compose: {
    name: 'compose',
    alias: [ 'comp', 'cmp', 'cm' ],
    tasks: {
      ...require('./build'),
      ...require('./down'),
      ...require('./up'),
    },
    description: `Runs docker compose command`,
    example: 'keg docker compose <command> <options>'
  }
}