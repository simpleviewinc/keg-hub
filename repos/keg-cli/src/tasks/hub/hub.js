module.exports = {
  hub: {
    name: 'hub',
    description: 'Keg Hub mono-repo tasks',
    example: 'keg hub <command> <options>',
    tasks: {
      ...require('./repos'),
      ...require('./run'),
    }
  }
}
