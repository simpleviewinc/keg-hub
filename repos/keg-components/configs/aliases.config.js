const pathAlias = require('./aliases.json')
const path = require('path')
const rootPath = path.join(__dirname, '../')

const platform = process.env.RE_PLATFORM || process.env.PLATFORM || 'web'
const reThemePath = platform === 'web'
  ? "./node_modules/@svkeg/re-theme/build/esm/reTheme.js"
  : "./node_modules/@svkeg/re-theme/build/esm/reTheme.native.js"


const getAliases = platform => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, platform)

    return updated
  }, { "@svkeg/re-theme": reThemePath })

const aliases = platform && getAliases(platform) || {}

const resolvedAlias = Object.entries(aliases)
  .reduce((updated, [ key, value ]) => {

    updated[key] = path.resolve(
      rootPath,
      value.replace("${platform}", platform),
    )

    return updated
  }, {})

module.exports.aliases = aliases
module.exports.getAliases = getAliases
module.exports.resolvedAlias = resolvedAlias
