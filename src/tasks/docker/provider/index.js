const { generalError } = require('KegUtils/error')

const providerAction = ({ task }) => {
  generalError(
    `Invalid docker provider task. Must be one of ${ Object.keys(task.tasks).join(' | ') }`
  )
}

module.exports = {
  provider: {
    name: 'provider',
    alias: [ 'prov', 'pro', 'pr', 'p', 'dp' ],
    action: providerAction,
    tasks: {
      ...require('./login'),
      ...require('./pull'),
      ...require('./push'),
    },
    description: 'Docker registry provider tasks',
    example: 'keg docker provider <task> <options>',
  }
}