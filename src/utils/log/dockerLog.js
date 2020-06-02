const { Logger } = require('KegLog')

/**
 * Log a docker api response based on the passed in arguemnts
 * @param {string} res - Response from docker api
 * @param {string} cmd - Command that docker ran
 *
 * @returns {void}
 */
const dockerLog = (res, cmd) => {

  Logger.empty()
  res
    ? Logger.data(res)
    : cmd
      ? Logger.success(`  Docker command "${cmd}" success!`)
      : Logger.success(`  Docker finished successfully!`)
  Logger.empty()

}


module.exports = {
  dockerLog
}