const { buildGlobalTaskAlias } = require('KegUtils/task/buildGlobalTaskAlias')

module.exports = {
  git: buildGlobalTaskAlias({
    name: 'git',
    alias: [],
    description: 'Run git commands on keg and tap repos!',
    example: 'keg git <options>',
    tasks: {
      ...require('./branch'),
      ...require('./commit'),
      ...require('./key'),
      ...require('./log'),
      ...require('./pull'),
      ...require('./push'),
    }
  })
}