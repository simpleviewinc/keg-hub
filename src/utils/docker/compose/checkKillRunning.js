const { ask } = require('askIt')
const { Logger } = require('KegLog')
const { isArr, checkCall } = require('@ltipton/jsutils')
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
          ? true
          : checkCall(async () => {
              await Promise.all(
                alreadyRunning.map(container => {
                  return stopService(
                    { ...args, params: { ...container }, },
                    { context: container.context, container: container.id }
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