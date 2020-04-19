const { buildTaskObject } = require('KegUtils/task/buildTaskObject')

module.exports = {
  global: buildTaskObject({
    name: 'global',
    alias: [ 'glob', 'gl' ],
    description: 'Keg CLI global specific tasks',
    example: 'keg global <command> <options>',
    tasks: {
      ...require('./config'),
      ...require('./general'),
    }
  })
}
