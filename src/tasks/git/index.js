const { buildTaskObject } = require('KegUtils/task/buildTaskObject')

module.exports = {
  git: buildTaskObject({
    name: 'git',
    alias: [],
    description: 'Run git commands on keg and tap repos!',
    example: 'keg git <options>',
    tasks: {
      ...require('./branch'),
      ...require('./commit'),
      ...require('./key'),
      ...require('./pull'),
      ...require('./push'),
    }
  })
}