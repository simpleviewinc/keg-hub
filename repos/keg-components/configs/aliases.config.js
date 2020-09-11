const pathAlias = require('./aliases.json')
const path = require('path')
const rootPath = path.join(__dirname, '../')

const platform = process.env.RE_PLATFORM || process.env.PLATFORM || 'web'

const ext = platform === 'web' ? '' : '.native'

const getAliases = platform => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, ext)

    return updated
  }, {})

const aliases = platform && getAliases(platform) || {}

const resolvedAlias = Object.entries(aliases)
  .reduce((updated, [ key, value ]) => {

    updated[key] = path.resolve(
      rootPath,
      value.replace("${platform}", ext),
    )

    return updated
  }, {})

module.exports.aliases = aliases
module.exports.getAliases = getAliases
module.exports.resolvedAlias = resolvedAlias
