const { Logger } = require('KegLog')
const { runYarnScript } = require('../helpers/runYarnScript')

const runRepoScript = async (repo, script, errorCb, log) => {
  log && Logger.log(`Running yarn ${script.trim()} for repo ${repo.repo} ...`)

  // Run the yarn script from the package.json of the repo
  return runYarnScript(
    repo.location,
    script,
    errorCb,
    false
  )
}


module.exports = {
  runRepoScript
}