const { ask } = require('@keg-hub/ask-it')
const { Logger } = require('KegLog')
const { isArr, checkCall } = require('@keg-hub/jsutils')
const { checkRunningContainers } = require('../checkRunningContainers')
const { stopService } = require('../../services/stopService')

/**
 * Checks if keg services are already running. Then it ask they should be killed
 * @param {Object} args - Default arguments passed to all tasks
 *
 * @returns {boolean} - If there are services already running
 */
const checkKillRunning = async (args, filter) => {
  const alreadyRunning = await checkRunningContainers(filter)
  
  return !isArr(alreadyRunning) || !alreadyRunning.length
    ? false
    : checkCall(async () => {
        const names = alreadyRunning.map(container => container.name).join(' | ')
        Logger.warn(`Can not start service while these containers are running:`)
        Logger.spacedMsg(`\t${names}`)

        const shouldKill = await ask.confirm(`Would you like to kill them first?`)

        return !shouldKill
          ? (Logger.error('Canceling task, User said NOT to kill current services!') && true) || true
          : checkCall(async () => {
              await Promise.all(
                alreadyRunning.map(container => {
                  const exArgs = { context: container.context, container: container.id }
                  container.context === 'tap' && (exArgs.tap = container.name)

                  return stopService(
                    { ...args, params: { ...container }, },
                    exArgs
                  )
                })
              )

              return false
            })
    })
}

module.exports = {
  checkKillRunning
}
