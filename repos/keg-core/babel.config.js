const appRootPath = require('app-root-path').path
const getAppConfig = require('tap-resolver/src/getAppConfig')
const { checkCall } = require('jsutils')
const tapConfig = getAppConfig(appRootPath, false, false)
const tapBabel = require('tap-resolver')(__dirname, tapConfig && tapConfig.name)

module.exports = api => {
  checkCall(api && api.cache, true)

  return tapBabel
}
