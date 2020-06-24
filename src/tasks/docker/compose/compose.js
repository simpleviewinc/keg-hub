
module.exports = {
  compose: {
    name: 'compose',
    alias: [ 'comp', 'cmp', 'cm', 'dcp' ],
    description: `Runs docker compose command`,
    example: 'keg docker compose <options>',
    tasks: {
      ...require('./build'),
      ...require('./down'),
      ...require('./stop'),
      ...require('./up'),
    }
  }
}