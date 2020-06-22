const { get } = require('jsutils')
const { isDetached } = require('../helpers/isDetached')
const { runInternalTask } = require('../task/runInternalTask')
const { throwInvalidParamMatch } = require('../error/throwInvalidParamMatch')

const syncService = (args, { syncDetached, tap, context }) => {
  const { params } = args
  const { attached, ensure, service } = params

  // Run the docker-sync task internally
  // Capture the response in case detached is true
  // That way we can use it with the docker-compose up command
  return runInternalTask(
    'tasks.docker.tasks.sync.tasks.start',
    {
      ...args,
      command: 'start',
      params: {
        ...args.params,
        tap: tap || params.tap,
        context: context || params.context,
        detached: syncDetached,
      },
    }
  )

}

module.exports = {
  syncService
}