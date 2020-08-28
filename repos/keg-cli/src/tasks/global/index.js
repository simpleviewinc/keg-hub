const { buildGlobalTaskAlias } = require('KegUtils/builders/buildGlobalTaskAlias')

module.exports = {
  global: buildGlobalTaskAlias({
    name: 'global',
    alias: [ 'glob', 'gl' ],
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>',
    tasks: {
      ...require('./open'),
      ...require('./publish'),
      ...require('./setup'),
      ...require('./validate'),
    }
  })
}
