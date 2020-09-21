const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { checkCall } = require('@keg-hub/jsutils')


const runYarnScript = async (location, script, errorCB, log) => {
  log && Logger.log(`Running yarn ${script.trim()}...`)

  // Run the yarn script from the package.json of the passed in location
  const scriptRep = await spawnCmd(
    `yarn ${script.trim()}`.trim(),
    { cwd: location },
    false
  )

  return scriptRep
    ? checkCall(errorCB, scriptRep, location, script)
    : scriptRep || true
}

module.exports = {
  runYarnScript
}