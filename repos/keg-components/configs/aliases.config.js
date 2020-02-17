const pathAlias = require('./aliases.json')

const getAliases = platform => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, platform)

    return updated
  }, {})

const usePlatform = process.env.PLATFORM || process.env.RE_PLATFORM

module.exports.getAliases = getAliases
module.exports.aliases = usePlatform && getAliases(usePlatform) || {}
