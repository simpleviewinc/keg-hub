const appRootPath = require('app-root-path').path
const getAppConfig = require('tap-resolver/src/getAppConfig')
const tapConfig = getAppConfig(appRootPath, false, false)
const tapBabel = require('tap-resolver')(__dirname, tapConfig && tapConfig.name)

module.exports = api => {
  api && api.cache && api.cache(false)

  return tapBabel
}
