const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

const throwPublishError = (publishContext, repo, fail, message) => {
  Logger.empty()
  Logger.error(`Error publishing context ${publishContext.name}!`)
  Logger.error(`Repo ${repo.repo} failed when running ${fail}!`)
  message && Logger.message(message)
  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwPublishError
}