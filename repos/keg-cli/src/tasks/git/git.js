const { buildGlobalTaskAlias } = require('KegUtils/builders/buildGlobalTaskAlias')

module.exports = {
  git: buildGlobalTaskAlias({
    name: 'git',
    alias: [],
    description: 'Run git commands on keg and tap repos!',
    example: 'keg git <options>',
    tasks: {
      ...require('./branch'),
      ...require('./commit'),
      ...require('./clone'),
      ...require('./fetch'),
      ...require('./key'),
      ...require('./log'),
      ...require('./pull'),
      ...require('./push'),
      ...require('./pullrequest'),
      ...require('./remote'),
      ...require('./branch/reset'),
    }
  })
}
