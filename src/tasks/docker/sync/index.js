module.exports = {
  name: 'sync',
  alias: [ 'sy' ],
  tasks: {
    clean: require('./clean'),
    start: require('./start'),
  },
  description: `Runs docker sync command`,
  example: 'keg docker sync <command> <options>'
}